# app/routers/wallet.py
import logging
from pathlib import Path
import csv
from typing import List
from fastapi import APIRouter, HTTPException


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

api_boat_list = APIRouter()
api_port_list = APIRouter()

# API endpoint to return list of boats from CSV file
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
