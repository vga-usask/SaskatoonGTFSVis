import gtfsRTBindingtest
import json
import glob
import errno


def writeToJSON(inputpath):

    files = glob.glob(inputpath+"*pb")
    for name in files:
        try:
            feed = gtfsRTBindingtest.getDataFeed(name)
            data = gtfsRTBindingtest.getVehiclePosition(feed)
            file = open(name[:-2]+"json", "w")
            jsondata = json.dumps(data)
            file.write(jsondata)
        except IOError as exc:
            if exc.errno != errno.EISDIR:
                raise


def mergeJSONFiles(inputpath,outputpath,tag):
    result = []
    for f in glob.glob(inputpath+tag+"*.json"):
        with open(f, "r") as infile:
            result.append(json.load(infile))

    with open(outputpath+"merged_"+tag+"_file.json", "w") as outfile:
        print("_______________")
        json.dump(result, outfile)


if __name__ == "__main__":
    # VehiclePositionURL = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\VehiclePosition1558994217.pb"
    # VPOutputFilePath = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\"
    #
    # VehiclePositionFeed = gtfsRTBindingtest.getDataFeed(VehiclePositionURL)
    # VehiclePositionData = gtfsRTBindingtest.getVehiclePosition(VehiclePositionFeed)
    # # writeToJSON(VehiclePositionData,VPOutputFilePath)
    #
    #
    # TripUpdateURL = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\TripUpdates1558994217.pb"
    # TUOutputFilePath = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\"
    #
    # TripUpdateFeed = gtfsRTBindingtest.getDataFeed(TripUpdateURL)
    # TripUpdateData = gtfsRTBindingtest.getVehiclePosition(TripUpdateFeed)

    inputpath = "..\\DataGetterInputExamples\\"
    writeToJSON(inputpath)

    mergepath = "..\\DataGetterOutputExamples\\"
    mergeJSONFiles(inputpath,mergepath,"VehiclePosition")