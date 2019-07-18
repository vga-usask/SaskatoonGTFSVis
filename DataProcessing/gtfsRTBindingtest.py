from google.transit import gtfs_realtime_pb2 # used library: gtfs-realtime-bindings
import urllib.request, os
from protobuf_to_dict import protobuf_to_dict # library protobuf3_to_dict - could use conda to install
                                                # command: pip install protobuf3-to-dict

# get data feed from gtfs-realtime
# the function could be used for gathering alert, tripupdate, vehiclepositions from gtfs-realtime
# argument: URL - address for the gtfs-realtime data
# return: data inside the file

def isWebURL(URL):
    if URL[0:4] == "HTTP" or URL[0:4] == "http":
      return True
    else:
      return False

def isFileURL(URL):
    if os.path.isfile(URL):
        return True
    else:
        return False


def getResponse(URL):
    if isWebURL(URL):
        return urllib.request.urlopen(URL)
    elif isFileURL(URL):
        return urllib.request.urlopen('file:'+urllib.request.pathname2url(URL))

def getDataFeed(URL):

    feed = gtfs_realtime_pb2.FeedMessage()
    response = getResponse(URL)
    feed.ParseFromString(response.read())
    return feed


def getVehiclePosition(feed):

    data = protobuf_to_dict(feed)
    return data


def getTripUpdate(feed):

    data = protobuf_to_dict(feed)
    return data


if __name__ == "__main__":
    VehiclePositionURL = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\VehiclePosition1561298400.pb"
    TripUpdateURL = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\TripUpdates1561298400.pb"
    VehiclePositionFeed = getDataFeed(VehiclePositionURL)
    TripUpdateFeed = getDataFeed(TripUpdateURL)


    print(getVehiclePosition(VehiclePositionFeed))
    print(getTripUpdate(TripUpdateFeed))