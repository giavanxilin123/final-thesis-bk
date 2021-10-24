from pymongo import MongoClient
import pymongo
import googlemaps
from pprint import pprint
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp


API_KEY = 'AIzaSyAkK1Nj9HWtb4R0crJISga3j9hq2aBC8lQ'
map_client = googlemaps.Client(API_KEY)
CONNECTION_STRING = "mongodb://localhost:27017"
client = MongoClient(CONNECTION_STRING)
dbs = client['GroceryStore']
collection = dbs['order']

order_list = collection.find()
order_delivery_list = list(filter(lambda x: x['status'] == 'Progressing', order_list))


demand_list = list(map(lambda x: x['quantity'], order_delivery_list))
demand_list.insert(0,0)

location_list = list(map(lambda x: x['location'], order_delivery_list))
location_tuple = list(map(lambda x: (x['lat'],x['lng']), location_list))


depot_position = (10.7719937, 106.7057951)
location_tuple.insert(0,depot_position)

API_KEY = 'AIzaSyAkK1Nj9HWtb4R0crJISga3j9hq2aBC8lQ'
map_client = googlemaps.Client(API_KEY)


def matrix_distance(x, lst):
    f = []
    for i in range(0, len(lst)):
        directions_result = map_client.directions(origin=x, destination=lst[i], mode="driving")
        f.append(directions_result[0]['legs'][0]['distance']['value'])
    return f

def create_data_model():
    """Stores the data for the problem."""
    distance_matrix= list(map(lambda x: matrix_distance(x, location_tuple), location_tuple))
    data = {}
    data['distance_matrix'] = distance_matrix
   
    data['demands'] = demand_list
    data['vehicle_capacities'] = [10,10,10,10]
    data['num_vehicles'] = 4
    data['depot'] = 0
    return data

def print_solution(data, manager, routing, solution):
    """Prints solution on console."""
    # print(f'Objective: {solution.ObjectiveValue()}')
    total_distance = 0
    total_load = 0
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
        route_distance = 0
        route_load = 0
        route_forEach_vehicle = ""
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            route_load += data['demands'][node_index]
            plan_output += ' {0} Load({1}) -> '.format(node_index, route_load)
            route_forEach_vehicle += '{0},'.format(node_index)
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id)
        plan_output += ' {0} Load({1})\n'.format(manager.IndexToNode(index),
                                                 route_load)
        plan_output += 'Distance of the route: {}m\n'.format(route_distance)
        plan_output += 'Load of the route: {}\n'.format(route_load)
        # print(plan_output)
        total_distance += route_distance
        total_load += route_load
        print(route_forEach_vehicle+'0')
    # print('Total distance of all routes: {}m'.format(total_distance))
    # print('Total load of all routes: {}'.format(total_load))
    # print(array_routes)

def main():
    """Solve the CVRP problem."""
    # Instantiate the data problem.
    data = create_data_model()

    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(len(data['distance_matrix']),
                                           data['num_vehicles'], data['depot'])

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)


    # Create and register a transit callback.
    def distance_callback(from_index, to_index):
        """Returns the distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['distance_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)


    # Add Capacity constraint.
    def demand_callback(from_index):
        """Returns the demand of the node."""
        # Convert from routing variable Index to demands NodeIndex.
        from_node = manager.IndexToNode(from_index)
        return data['demands'][from_node]

    demand_callback_index = routing.RegisterUnaryTransitCallback(
        demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,  # null capacity slack
        data['vehicle_capacities'],  # vehicle maximum capacities
        True,  # start cumul to zero
        'Capacity')

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.FromSeconds(10)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)

    # Print solution on console.
    if solution:
        print_solution(data, manager, routing, solution)


if __name__ == '__main__':
    main()

