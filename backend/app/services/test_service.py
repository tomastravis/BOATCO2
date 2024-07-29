"""Contains main functions"""

# Standard libraries
import os
import logging
import asyncio
from typing import List

# Local imports


logger = logging.getLogger(__name__)

def sum(x: int, y: int) -> int:
    """
    Sums to numbers of the user's choice"""
    
    logger.info("Summing numbers")
    z = x + y

    logger.info("Numbers summed")

    return z
    
    # except exceptions.TransactionNotFound as e: 
    #    logger.error("Error idk: %s", str(e))
    #    raise exceptions.TransactionNotFound(
    #        f"numero no encontrada: {str(e)}") from e
