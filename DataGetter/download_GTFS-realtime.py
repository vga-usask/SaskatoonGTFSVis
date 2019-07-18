import urllib.request
import datetime
import time


startTime = datetime.datetime(2019, 6, 23, 8, 0, 0)
endTime = datetime.datetime(2019,6,23,11,1,0)

outputPath = "..\\DataGetterInputExamples\\"

def getGTFSrealtime():
    timestamp = int(time.time())
    urllib.request.urlretrieve('http://apps2.saskatoon.ca/app/data/TripUpdate/TripUpdates.pb', outputPath+"TripUpdates"+str(timestamp)+".pb")
    urllib.request.urlretrieve('http://apps2.saskatoon.ca/app/data/Alert/Alerts.pb', outputPath+
                               "Alerts" + str(timestamp) + ".pb")
    urllib.request.urlretrieve('http://apps2.saskatoon.ca/app/data/Vehicle/VehiclePositions.pb',outputPath +
                               "VehiclePosition" + str(timestamp) + ".pb")

def main ():
    while datetime.datetime.now() < startTime:
        time.sleep(1)
    #switch = True
    print("program has just started ")
    while True:

        if (datetime.datetime.now() > endTime):
            print("Program terminated")
            #switch = False
            return
        print("time: ",datetime.datetime.now())
        start = datetime.datetime.now()
        getGTFSrealtime()
        end = datetime.datetime.now()
        exec_time = end - start
        time.sleep(30 - exec_time.total_seconds()) # change 10s to variable interval for 60 seconds


main()


