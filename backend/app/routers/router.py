# app/routers/wallet.py
import logging
from fastapi import APIRouter, HTTPException
from app.services.test_service import sum


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


api_sum = APIRouter()

@api_sum.get("/sum")
async def summ(x: int, y: int):
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