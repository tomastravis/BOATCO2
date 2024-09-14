# app/routers/wallet.py
import logging
from pathlib import Path
import csv
from typing import List
from fastapi import APIRouter, HTTPException
from app.services.test_service import plot_routes, load_data


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

api_boat_list = APIRouter()
api_network = APIRouter()

# Define a data model
class boat_details:
    imo: int
    name: str
    ship_type: str
    fuel_kg_per_nm_consumption: float
    c02_kg_per_nm_emissions: float

# API endpoint to return list of boats from CSV file
@api_boat_list.get("/get_boats", response_model=List[dict])
async def get_boats():
    boats = []
    csv_file_path = Path("data/boat_co2_data_list.csv")  # Path to your CSV file

    # Open and read the CSV file
    with csv_file_path.open() as csvfile:
        reader = csv.DictReader(csvfile)  # Read as dictionary
        for row in reader:
            boats.append({"imo": row["imo"], "name": row["name"]})

    return boats

@api_network.get("/get_network")
def get_network():
    # Load the CSV data
    cluster_coordinates_df, network_df = load_data('data/cluster_coordinates.csv', 'data/network.csv')

    # Prepare the data to return as JSON
    route_data = []
    for _, row in network_df.iterrows():
        route_data.append({
            'from': {'lat': row['lat.x'], 'lon': row['lon.x']},
            'to': {'lat': row['lat.y'], 'lon': row['lon.y']},
            'distance': row['distance']
        })

    node_data = cluster_coordinates_df.to_dict(orient='records')

    return {'routes': route_data, 'nodes': node_data}