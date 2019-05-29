import urllib.request
import datetime
import time


startTime = datetime.datetime(2019, 5, 18, 16, 40, 0)
endTime = datetime.datetime(2019,5,18,16,41,0)

outputPath = "C:\\Users\\Kevin\\Documents\\GTFS_saskatoon\\Output\\"

def getGTFSrealtime():
    timestamp = int(time.time())
    urllib.request.urlretrieve('http://apps2.saskatoon.ca/app/data/TripUpdate/TripUpdates.pb', outputPath+"TripUpdates"+str(timestamp)+".pb")
    urllib.request.urlretrieve('http://apps2.saskatoon.ca/app/data/Alert/Alerts.pb', outputPath+
                               "Alerts" + str(timestamp) + ".pb")
    urllib.request.urlretrieve('http://apps2.saskatoon.ca/app/data/Vehicle/VehiclePositions.pb',outputPath +
                               "VehiclePosition" + str(timestamp) + ".pb")


getGTFSrealtime()