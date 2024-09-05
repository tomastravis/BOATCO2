# app/routers/wallet.py
import logging
from pathlib import Path
import csv
from typing import List
from fastapi import APIRouter, HTTPException
from app.services.test_service import sum


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


api_sum = APIRouter()
api_boat_list = APIRouter()


@api_sum.get("/sum")
async def sum_router(x: int, y: int):
    '''Sums two numbers

    Args:
        x (int): number x
        y (int): number y

    Returns:   
        z (int): number
    '''
    logger.info("Receiving numbers")
    logger.info("Number x: %s", x)
    logger.info("Number y: %s", y)
    try:
        logger.info("Summing numbers")
        z = sum(x,y)
        logger.info("Numbers summed")

        return {"result": z}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e

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