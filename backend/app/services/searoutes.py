import searoute as sr

def calculate_maritime_route(origin, destination, units="km", speed_knot=24, 
                             append_orig_dest=True, restrictions=None, 
                             include_ports=True, 
                             return_passages=True):
    """
    Calculates a maritime route and returns routing info and map in GeoJSON format.
    
    Args:
        origin (tuple): Coordinates of the origin point (longitude, latitude).
        destination (tuple): Coordinates of the destination point (longitude, latitude).
        units (str): Units for distance ('km', 'm', 'mi', 'naut', etc.). Defaults to 'km'.
        speed_knot (float): Speed in knots. Defaults to 20.
        append_orig_dest (bool): Whether to include origin/destination in the route. Defaults to True.
        restrictions (list): List of restricted passages (e.g., ['northwest']). Defaults to None.
        include_ports (bool): Whether to include nearby ports in the calculation. Defaults to True.
        port_params (dict): Parameters for port selection (e.g., {'only_terminals': True}). Defaults to None.
        return_passages (bool): Whether to return passage information. Defaults to True.
    
    Returns:
        dict: Route information with GeoJSON map.
    """
    import logging

    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger(__name__)

    logger.debug(f"Inputs - Origin: {origin}, Destination: {destination}, Units: {units}, Speed: {speed_knot}")

    if restrictions is None:
        restrictions = ['northwest']
    
    # Calculate the route
    try:
        route = sr.searoute(origin, 
                            destination, 
                            units=units, 
                            speed_knot=speed_knot, 
                            append_orig_dest=append_orig_dest, 
                            restrictions=restrictions, 
                            include_ports=include_ports,
                            return_passages=return_passages)
        
        # Retrieve distance and units
        distance = route.properties.get('length', 0)
        distance_units = route.properties.get('units', units)
        
        # Print route information
        print(f"Route length: {distance:.1f} {distance_units}")
        
        return {
            "route_geojson": route,  # GeoJSON LineString Feature
            "distance": distance,
            "units": distance_units
        }
    except Exception as e:
        print(f"Error calculating route: {e}")
        return None

# Example Usage
origin = (-121.25, -58.74)  # Example origin
destination = (-123.75, -58.74)  # Example destination
result = calculate_maritime_route(
    origin, 
    destination, 
    units="naut", 
    speed_knot=15, 
    restrictions=['northwest']
)

# Access and use the results
if result:
    print(f"Distance: {result['distance']} {result['units']}")
    print(f"GeoJSON Map: {result['route_geojson']}")
