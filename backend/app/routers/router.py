import logging
from pathlib import Path
import csv
from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Tuple
from app.services.searoutes import calculate_maritime_route


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

api_boat_list = APIRouter()
api_port_list = APIRouter()
api_route_calc = APIRouter()

# Input model for the route calculation
class RouteRequest(BaseModel):
    origin: Tuple[float, float]  # (longitude, latitude)
    destination: Tuple[float, float]  # (longitude, latitude)
    units: Optional[str] = "km"  # Default to kilometers
    speed_knot: Optional[float] = 20  # Default speed
    append_orig_dest: Optional[bool] = True
    restrictions: Optional[List[str]] = ["northwest"]
    include_ports: Optional[bool] = True
    return_passages: Optional[bool] = True

# Response model
class RouteResponse(BaseModel):
    distance: float
    units: str
    route_geojson: dict

# API endpoint to return the list of boats from CSV file
@api_boat_list.get("/get_boats", response_model=List[dict])
async def get_boats() -> list:
    """ get request for sending boat list to the frontend """
    boats = []
    csv_file_path = Path("data/boat_co2_data_list.csv")  # Path to your CSV file

    # Open and read the CSV file
    with csv_file_path.open(encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)  # Read as dictionary
        for row in reader:
            boats.append({"imo": row["imo"], "name": row["name"]})

    return boats

# API endpoint to return the list of ports from CSV file
@api_port_list.get("/get_ports", response_model=List[dict])
async def get_ports() -> list:
    """ get request for sending port list to the frontend """
    ports = []
    csv_file_path = Path("data/ports_data.csv")  # Path to your CSV file

    # Open and read the CSV file
    with csv_file_path.open(encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)  # Read as dictionary
        for row in reader:
            ports.append({"port": row["PORT"], "country": row["COUNTRY"],
                          "lat": row["LAT"], "lon": row["LON"]})

    return ports

# API endpoint to calculate maritime route info based on the frontend input
@api_route_calc.post("/calculate_route", response_model=RouteResponse)
async def calculate_route(request: RouteRequest):
    print(f"Received request: {request}")
    print(f"Origin type: {type(request.origin)}, Destination type: {type(request.destination)}")
    """ POST request to calculate and return maritime route """
    try:
        # Call the existing calculate_maritime_route function
        result = calculate_maritime_route(
            origin=request.origin,
            destination=request.destination,
            units=request.units,
            speed_knot=request.speed_knot,
            append_orig_dest=request.append_orig_dest,
            restrictions=request.restrictions,
            include_ports=request.include_ports,
            return_passages=request.return_passages,
        )

        if result is None:
            raise HTTPException(status_code=400, detail="Route calculation failed.")

        # Ensure the function result matches the RouteResponse model
        return RouteResponse(
            distance=result["distance"],
            units=result["units"],
            route_geojson=result["route_geojson"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating route: {e}")