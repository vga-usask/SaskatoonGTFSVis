import json
import gtfsRTBindingtest


def writeToJSON(dictionary,outputfilepath):
    jsondata = json.dumps(dictionary)
    file = open(outputfilepath,"w")
    file.write(jsondata)
    file.close()

if __name__ == "__main__":


    # r = {'is_claimed': 'True', 'rating': 3.5}
    # r = json.dumps(r)
    # loaded_r = json.loads(r)
    # print(r)
    # print(type(r))
    # print(type(loaded_r))
    VehiclePositionURL = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\VehiclePosition1558994217.pb"
    VPOutputFilePath = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\VehiclePosition1558994217.json"

    VehiclePositionFeed = gtfsRTBindingtest.getDataFeed(VehiclePositionURL)
    VehiclePositionData = gtfsRTBindingtest.getVehiclePosition(VehiclePositionFeed)
    writeToJSON(VehiclePositionData,VPOutputFilePath)


    TripUpdateURL = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\TripUpdates1558994217.pb"
    TUOutputFilePath = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\TripUpdates1558994217.json"

    TripUpdateFeed = gtfsRTBindingtest.getDataFeed(TripUpdateURL)
    TripUpdateData = gtfsRTBindingtest.getVehiclePosition(TripUpdateFeed)
    writeToJSON(TripUpdateData,TUOutputFilePath)