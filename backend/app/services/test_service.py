# Standard libraries
import os
import logging
import asyncio
from typing import List

# Local imports
import matplotlib.pyplot as plt
import networkx as nx
import pandas as pd

logger = logging.getLogger(__name__)

def load_data(cluster_coordinates_file: str, network_file: str):
    # Load CSV files
    cluster_coordinates_df = pd.read_csv(cluster_coordinates_file)
    network_df = pd.read_csv(network_file)

    # Mark certain clusters as ports for demonstration
    cluster_coordinates_df['is_port'] = cluster_coordinates_df['cluster'].apply(lambda x: True if x % 5 == 0 else False)

    return cluster_coordinates_df, network_df


def plot_routes(cluster_coordinates_file: str, network_file: str, output_image: str):
    """
    Function to plot the world network of possible routes between coordinates.
    
    Args:
    - cluster_coordinates_file: Path to the cluster coordinates CSV file.
    - network_file: Path to the network CSV file.
    - output_image: Path to save the output plot image.

    Returns:
    - None. The function saves the image of the plot to the specified path.
    """

    # Load the CSV files
    cluster_coordinates_df = pd.read_csv(cluster_coordinates_file)
    network_df = pd.read_csv(network_file)

    # Create a set of valid coordinates from the cluster file
    valid_coordinates = set((row['lat'], row['lon']) for _, row in cluster_coordinates_df.iterrows())

    # Create a graph object
    G = nx.Graph()

    # Add edges (routes) from the network dataframe, but only if both points are valid
    for _, row in network_df.iterrows():
        point1 = (row['lat.x'], row['lon.x'])
        point2 = (row['lat.y'], row['lon.y'])
        
        if point1 in valid_coordinates and point2 in valid_coordinates:
            G.add_edge(point1, point2, weight=row['distance'])

    # Generate node positions using the coordinates from cluster file
    node_positions = { (row['lat'], row['lon']): (row['lon'], row['lat']) for _, row in cluster_coordinates_df.iterrows() }
    
    # Filter node positions for nodes that exist in the graph
    filtered_node_positions = {node: pos for node, pos in node_positions.items() if node in G.nodes()}

    # Plot the graph using the valid coordinates as positions
    plt.figure(figsize=(10, 6))
    nx.draw(
        G,
        pos=filtered_node_positions,  # Position of nodes based on longitude and latitude
        node_size=10,
        edge_color='blue',
        node_color='red',
        with_labels=False,
        alpha=0.7
    )

    # Set plot title and axis labels
    plt.title("World Network of Possible Routes Between Coordinates")
    plt.xlabel("Longitude")
    plt.ylabel("Latitude")

    # Save the plot as an image
    plt.savefig(output_image)
    plt.close()

# Example usage:
# plot_routes('cluster_coordinates.csv', 'network.csv', 'output_plot.png')
