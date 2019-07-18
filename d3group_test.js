//Width and height
var w = 500;
var h = 500;

//Define map projection
var projection = d3.geoMercator()
    .center([-106.67, 52.1332])
    .translate([w / 2, h / 2])
    .scale([140000]);

//Define path generator
var path = d3.geoPath()
    .projection(projection);

//Create SVG element
var svg = d3.select("svg")
    // .append("svg")
    // .attr("width", w)
    // .attr("height", h)
    // .attr("viewbox","0 0 800 600" )
    .call(d3.zoom().on("zoom", zoomHandler));

var group = svg.append("g").attr("id", "Buses")

var datalist = [] // a list of vehicle data object according to same index that represent unique ids in vehicledilist below

var vehicleidlist = [] // a list of vehicle unique ids

var geoPath=NaN

var text=NaN

//Load in GeoJSON data
d3.json("saskatoon.json").then(function (json) {

    //Bind data and create one path per GeoJSON feature
    geoPath = svg
        .insert("g","#Buses")
        .selectAll("path")
        .data(json.features)
        .enter() // a loop for all the points in saskatoon.json
        .append("path")

        .attr("d", path)
        .attr('fill', '#f4c242')
    //.attr('stroke', 'black')
    //.append('title')
    //.text(function(d) {
    //return d.properties.name;
    //})

    text = svg.selectAll('text')
        .data([
            [-106.6, 52.13]
        ])
        .enter()
        .append("text")
        .attr("x", d => projection(d)[0])
        .attr("y", d => projection(d)[1])
        .text("123")

    


});

var circles = svg.selectAll("g circle")

function zoomHandler() {
    geoPath.attr("transform", d3.event.transform);
    group.attr("transform", d3.event.transform);
    group.selectAll("circle").attr("r", 4 / d3.event.transform.k);
    // projection.scale([140000 * d3.event.transform.k]);
    // svg.selectAll("g").attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ')');
    // path = d3.geoPath()
    //     .projection(projection);
    // geoPath
    //     .attr("d", path);
    // text
    //     .attr("x", d => projection(d)[0])
    //     .attr("y", d => projection(d)[1]);
    // circles // make this a variable beforehand
    //     .attr("cx", d => projection([d.longitude, d.latitude])[0])
    //     .attr("cy", d => projection([d.longitude, d.latitude])[1]);
};

function search(integer, list) {
    for (index = 0; index < list.length; index++) {
        if (integer == list[index]) {
            return true
        }
    }
    return false

}

function objectsearch(integer, objectlist) {
    for (index = 0; index < objectlist.length; index++) {
        if (integer == objectlist[index]['id']) {
            return true
        }
    }
    return false
}

function compareNumbers(a, b) {
    return a - b;
}

function compareObjectsbyid(obj1, obj2) {
    if (obj1['id'] < obj2['id']) {
        return -1
    }
    if (obj1['id'] > obj2['id']) {
        return 1
    }
    return 0

}

async function test() {
    var data = await d3.json("Output/merged_VehiclePosition_file.json");

    


    for (i = 0; i < data.length; i++) {
        vehicles = data[i].entity
        for (j = 0; j < vehicles.length; j++) {
            vehicleinfo = vehicles[j]
            vehicleid = vehicleinfo.vehicle.vehicle.id

            if (search(vehicleid, vehicleidlist) == false) {
                vehicleidlist.push(vehicleid)
            }

        }
        vehicleidlist.sort(compareNumbers)


    }
    console.log(vehicleidlist)

    //TODO: data format: [[{vehicle info}] ,[{}],.....]

    for (j = 0; j < data.length; j++) {
        var templist = []
        vehicles = data[j].entity


        for (l = 0; l < vehicles.length; l++) {
            vehicleinfo = vehicles[l]
            vehicleid = vehicleinfo.vehicle.vehicle.id
            vehiclelong = vehicleinfo.vehicle.position.longitude
            vehiclelat = vehicleinfo.vehicle.position.latitude
            vehiclecontainer = new Object()
            vehiclecontainer["id"] = vehicleid
            vehiclecontainer["longitude"] = vehiclelong
            vehiclecontainer["latitude"] = vehiclelat

            templist.push(vehiclecontainer)

        }
        for (k = 0; k < vehicleidlist.length; k++) {
            //console.log(templist[vehicleidlist[k]])
            for (m = 0; m < templist.length; m++) {
                if (objectsearch(vehicleidlist[k], templist) == false) {
                    anothervehiclecontainer = new Object()
                    anothervehiclecontainer["id"] = vehicleidlist[k]
                    anothervehiclecontainer["longitude"] = 0
                    anothervehiclecontainer["latitude"] = 0
                    templist.push(anothervehiclecontainer)
                }
            }

        }
        templist.sort(compareObjectsbyid)
        datalist.push(templist)

    }


    console.log(datalist)
    document.getElementById("test-input").value = 0
    document.getElementById("test-input").max = datalist.length - 1

    

    group
        .selectAll("circle")
        .data(datalist[0])
        .enter()
        .append("circle")
        .attr("id", d => d.id)
        .attr("cx", d => projection([d.longitude, d.latitude])[0])
        .attr("cy", d => projection([d.longitude, d.latitude])[1])
        .attr("fill", "blue")
        .attr("r", 4);

    // setTimeout(() => {
    //     var temp = datalist[0][0];
    //     temp.latitude = 52.2;
    //     temp.longitude = -106.7;
    //     group.selectAll("circle")
    //         .transition()
    //         .duration(500)
    //         .attr("cx", d => projection([d.longitude, d.latitude])[0])
    //         .attr("cy", d => projection([d.longituded, d.latitude])[1]);

    //     setTimeout(() => {
    //         var temp = datalist[0][0];
    //         temp.latitude = 52.22;
    //         temp.longitude = -106.71;
    //         group.selectAll("circle")
    //             .transition()
    //             .duration(500)
    //             .attr("cx", d => projection([d.longitude, d.latitude])[0])
    //             .attr("cy", d => projection([d.longituded, d.latitude])[1]);
    //     }, 500)
    // }, 1000)

    // var counter1 = 0
    // test1(counter1)

    // function test1(counter1) {
    //     if (counter1 < datalist.length) {

    //         setTimeout(() => {
    //             // datalist[0]=datalist[counter1]
    //             // for (var i = 0; i < datalist[84].length; i++) {
    //             //     datalist[0][i] = datalist[84][i]
    //             // }
    //             group.selectAll("circle")
    //                 .data(datalist[counter1])
    //                 .transition()
    //                 .duration(10)

    //                 .attr("cx", d => projection([d.longitude, d.latitude])[0])
    //                 .attr("cy", d => projection([d.longitude, d.latitude])[1]);

    //             counter1 = counter1 + 1
    //             test1(counter1);
    //         }, 10);

    //     }
    //     return

    // }
    

}

function test2(startIndex, endIndex) {
    if (startIndex <endIndex) {

        setTimeout(() => {
            // datalist[0]=datalist[counter1]
            // for (var i = 0; i < datalist[84].length; i++) {
            //     datalist[0][i] = datalist[84][i]
            // }
            group.selectAll("circle")
                .data(datalist[startIndex])
                .transition()
                .duration(10)

                .attr("cx", d => projection([d.longitude, d.latitude])[0])
                .attr("cy", d => projection([d.longitude, d.latitude])[1]);

            startIndex = startIndex + 1
            test2(startIndex,endIndex);
        }, 15);
    }
    else if(startIndex > endIndex){
        setTimeout(() => {
            // datalist[0]=datalist[counter1]
            // for (var i = 0; i < datalist[84].length; i++) {
            //     datalist[0][i] = datalist[84][i]
            // }
            group.selectAll("circle")
                .data(datalist[startIndex])
                .transition()
                .duration(10)

                .attr("cx", d => projection([d.longitude, d.latitude])[0])
                .attr("cy", d => projection([d.longitude, d.latitude])[1]);

            startIndex = startIndex - 1
            test2(startIndex,endIndex);
        }, 15);
        
    }


}

var memoryCounter=0
function rangechanged(event) {
    var currentIndex = document.getElementById("test-input").value
    //alert(document.getElementById("test-input").value)
    // loop of transition here

    test2(memoryCounter,currentIndex)

    // after loop is done, remember the position
    memoryCounter = document.getElementById("test-input").value


}

var lasttime;

function rangeinput(event){
    var now = new Date();
    var timediff = lasttime ? now - lasttime : 100;
    lasttime = now;
    var currentIndex = document.getElementById("test-input").value
    group.selectAll("circle")
    .data(datalist[currentIndex])
    .transition()
    .duration(timediff)

    .attr("cx", d => projection([d.longitude, d.latitude])[0])
    .attr("cy", d => projection([d.longitude, d.latitude])[1]);

    setTimeout(() => {
        lasttime = null;
    }, 1000);

}

var pause = false
var playIndex=0
function playHandler(){
    pause = false
    setTimeout(()=>{
        if(+document.getElementById("test-input").value < +document.getElementById("test-input").max && !pause){
            +document.getElementById("test-input").value++;
            document.getElementById("test-input").oninput();
            playHandler();
        }
        else if(+document.getElementById("test-input").value == +document.getElementById("test-input").max && !pause){
            document.getElementById("test-input").value = 0;
            document.getElementById("test-input").oninput();
            playHandler();
        }
    }, 50);
    // if (playIndex<datalist.length && pause ==false){
    // setTimeout(()=>{
    //     group.selectAll("circle")
    //             .data(datalist[playIndex])
    //             .transition()
    //             .duration(50)

    //             .attr("cx", d => projection([d.longitude, d.latitude])[0])
    //             .attr("cy", d => projection([d.longitude, d.latitude])[1]);

    //         playIndex = playIndex + 1
    //         playHandler();
    //     },50)
    // }
    // // if(document.getElementById('play').clicked == true && pause == true){
    // //     pause=false
    // //     playHandler()
    // // }
    // else if(playIndex=datalist.length){
    //     playIndex=0
    // }
    
    
}


function pauseHandler(){
    pause= true
}

// playIndex=0
test()