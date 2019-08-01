//Width and height
var w = 1536;
var h = 768;

//Define map projection
var projection = d3.geoMercator()
    .center([-106.67, 52.1332])
    .translate([w / 2, h / 2])
    .scale([140000]);

//Define path generator
var path = d3.geoPath()
    .projection(projection);

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);


//Load in GeoJSON data
d3.json("saskatoon.json").then(function(json) {

    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(json.features)
        .enter() // a loop for all the points in saskatoon.json
        .append("path")
        .attr("d", path  )
        .attr('fill', '#f4c242')
        //.attr('stroke', 'black')
        //.append('title')
        //.text(function(d) {
            //return d.properties.name;
        //})


});

async function temp(){
    var a = await d3.json("saskatoon.json");
    var data = await d3.json("Output/merged_VehiclePosition_mod.json");
    
    //console.log(a)
    //console.log(data)

    svg.selectAll("circle")
    .data(data)
    .enter() // a loop for all the bus data in merge_file.json
    .selectAll("circle")
    .data(function(d){
        //console.log(d.entity)
        return d.entity})
    .enter() // data for all bus data in object.entity
    .append("circle")
    .transition()
    .duration(5000)
    .attr("cx",function (d){return projection([d.vehicle.position.longitude
        ,d.vehicle.position.latitude])[0] })
    .attr("cy",function (d){return projection([d.vehicle.position.longitude
        ,d.vehicle.position.latitude])[1] })
    .attr('fill', '#3d00f4')
    .attr("r",5)
    // .attr("transform", function(d) 
    // {return "translate(" + projection([d.vehicle.position.longitude
    //     ,d.vehicle.position.latitude]) + ")";})

}

async function test(){
    var data = await d3.json("Output/merged_VehiclePosition_file.json");
    var routedict = {}
    var labeldict ={}
    var textdict={}
    var xcounter=0
    var ycounter=0
    var zcounter=0
    counter = 0

    for (j=0; j<data[0].entity.length;j++){
                
        // if there are no points on the page
            //console.log(vehicleid);
            vehicleinfo=data[0].entity[j]
            console.log(data[0].entity)
            route_id = vehicleinfo.vehicle.trip.route_id
            vehicleid=vehicleinfo.vehicle.vehicle.id
            vehiclelabel=vehicleinfo.vehicle.vehicle.label // going to use vehicleid instead
            vehiclelong=vehicleinfo.vehicle.position.longitude
            vehiclelat=vehicleinfo.vehicle.position.latitude

            
            // if (typeof routedict[vehicleid] == "undefined"){ // if routedict[route_id] has not been defined
            //     routedict[vehicleid]=new Object();
            //     routedict[vehicleid][route_id] = 
            //         svg.append("circle")
            //         .attr("id",vehicleid)
            //         .attr("fill", "blue")
            //         .attr("r", 4)
            //         .attr("cx", function (d){return projection([vehiclelong
            //             ,vehiclelat])[0] })
            //         .attr("cy", function (d){return projection([vehiclelong
            //             ,vehiclelat])[1] }
            //             )
            //     xcounter+=1
            //     console.log("Test1")
            // }
            routedict[vehicleid]=new Object()
            routedict[vehicleid][route_id] = 
            svg
            .append("circle")
            .attr("id",vehiclelabel)
            .attr("fill", "blue")
            .attr("r", 4)
            .attr("cx", function (d){return projection([vehiclelong
                    ,vehiclelat])[0] })
            .attr("cy", function (d){return projection([vehiclelong
                    ,vehiclelat])[1] }
                    )
            // var text=svg.append("text")
            // .attr("x",function (d){return projection([vehiclelong
            //     ,vehiclelat])[0] })
            // .attr("y",function (d){return projection([vehiclelong
            //     ,vehiclelat])[1] })
            // .text(vehiclelabel+"")
            
            //console.log(routedict[vehicleid][route_id].attr("id"))
            labeldict[routedict[vehicleid][route_id].attr("id")]= svg.append("text")
            .attr("x",function (d){return projection([vehiclelong
                ,vehiclelat])[0] })
            .attr("y",function (d){return projection([vehiclelong
                ,vehiclelat])[1] })
            .text(vehiclelabel+"")
            //console.log(vehiclelabel)
            //console.log(routedict);
            ycounter+=1

                 
        }
    
    
    var counter = 0
    for (i=1; i<data.length;i++){

        item = data[i]
        console.log(Object.keys(routedict).length)

        //console.log(xcounter+ycounter)

        
        if (i+1<data.length){
            nextitem=data[i+1]
            //TODO update the coordinates for points to use
            for (k=0; k<nextitem.entity.length;k++){
                nextvehicleinfo = nextitem.entity[k]
                nextroute_id = nextvehicleinfo.vehicle.trip.route_id
                nextvehicleid = nextvehicleinfo.vehicle.vehicle.id
                nextvehiclelabel = nextvehicleinfo.vehicle.vehicle.label
                var nextvehiclelon = nextvehicleinfo.vehicle.position.longitude
                var nextvehiclelat = nextvehicleinfo.vehicle.position.latitude
                zcounter+=1
                if (nextvehicleid in routedict){
                    if(nextroute_id in routedict[nextvehicleid]){ // if the next route id exists in the current dictionary
                        
                        //console.log(routedict)
                        //console.log(nextroute_id,nextvehicleid)
                        routedict[nextvehicleid][nextroute_id]   
                        //routedict[nextvehicleid][nextroute_id]
                        .transition()
                        //.delay(3000*k)
                        .duration(500)
                        .attr("cx", function (d){return projection([nextvehiclelon
                            ,nextvehiclelat])[0]})
                        .attr("cy", function (d){return projection([nextvehiclelon
                            ,nextvehiclelat])[1]})
                            
                        console.log(routedict[nextvehicleid][nextroute_id].attr("id"))
                        labeldict[routedict[nextvehicleid][nextroute_id].attr("id")] = 
                        labeldict[routedict[nextvehicleid][nextroute_id].attr("id")]
                        .transition()
                        .duration(500)
                        .attr("x", function (d){return projection([nextvehiclelon
                            ,nextvehiclelat])[0]})
                        .attr("y", function (d){return projection([nextvehiclelon
                            ,nextvehiclelat])[1]})
                            
                      
                        // .transition()
                        //     //.delay(3000*k)
                        // .duration(500)
                        // .attr("x", function (d){return projection([nextvehiclelon
                        //     ,nextvehiclelat])[0]})
                        // .attr("y", function (d){return projection([nextvehiclelon
                        //     ,nextvehiclelat])[1]})
                        

                        
                    }
                    else { // if routeid is not in the next vehicleid, add the circle
                        //TODO:first set routedict[nextvehicleid] to null, then add the new circle
                        
                        for(key in routedict[nextvehicleid]){
                            routedict[nextvehicleid][key].remove()
                            delete routedict[nextvehicleid][key]
                        
                            
                            // labeldict[nextvehiclelabel].remove()
                            // delete labeldict[nextvehiclelabel]

                            //console.log(routedict,nextvehicleid,key)

                        }
                        labeldict[routedict[nextvehicleid][nextroute_id].attr("id")].remove()
                        delete labeldict[routedict[nextvehicleid][nextroute_id]]

                        routedict[nextvehicleid][nextroute_id] = 
                        svg
                        .append("circle")
                        .attr("fill", "blue")
                        .attr("id",nextvehiclelabel)
                        .attr("r", 4)
                        .attr("cx", function (d){return projection([nextvehiclelon
                            ,nextvehiclelat])[0] })
                        .attr("cy", function (d){return projection([nextvehiclelon
                            ,nextvehiclelat])[1] }) 
                            
                        labeldict[routedict[nextvehicleid][nextroute_id].attr("id")] =svg.append("text")
                            .attr("x",function (d){return projection([nextvehiclelon
                                ,vehiclelat])[0] })
                            .attr("y",function (d){return projection([nextvehiclelon
                                ,vehiclelat])[1] })
                            .text(nextvehiclelabel+"")

                        // labeldict[vehiclelabel] = svg.append("text")
                        // .attr("x",function (d){return projection([vehiclelong
                        //         ,vehiclelat])[0] })
                        // .attr("y",function (d){return projection([vehiclelong
                        //         ,vehiclelat])[1] })
                        // .attr("text",vehiclelabel)
                            
                            
                        
                    }  

                }
                else{ // nextvehicleid not in dictionary
                    //TODO: add the new vehicle & route information
                    // routedict[nextvehicleid][nextroute_id].remove()
                    // delete routedict[nextvehicleid]
                    // console.log("delete circles")
                    
                    routedict[nextvehicleid] = new Object()
                    routedict[nextvehicleid][nextroute_id] = 
                        svg
                        .append("circle")
                        .attr("id",nextvehiclelabel)
                        .attr("fill", "blue")
                        .attr("r", 4)
                        .attr("cx", function (d){return projection([nextvehiclelon
                            ,nextvehiclelat])[0] })
                        .attr("cy", function (d){return projection([nextvehiclelon
                            ,nextvehiclelat])[1] }
                            )
                            
                            labeldict[routedict[nextvehicleid][nextroute_id].attr("id")] =svg.append("text")
                            .attr("x",function (d){return projection([nextvehiclelon
                                ,vehiclelat])[0] })
                            .attr("y",function (d){return projection([nextvehiclelon
                                ,vehiclelat])[1] })
                            .text(nextvehiclelabel+"")
                        
                    // labeldict[vehiclelabel] = svg.append("text")
                    // .attr("x",function (d){return projection([vehiclelong
                    //     ,vehiclelat])[0] })
                    // .attr("y",function (d){return projection([vehiclelong
                    //     ,vehiclelat])[1] })
                    // .attr("text",vehiclelabel)
                    
                    
                    // textdict[nextvehicleid] = new Object()
                    // textdict[nextvehicleid][nextroute_id] = svg.append("text")
                    // .text(nextvehicleid+"")
                    // .attr("x", function (d){return projection([nextvehiclelon
                    //     ,nextvehiclelat])[0] })
                    // .attr("y", function (d){return projection([nextvehiclelon
                    //     ,nextvehiclelat])[1] }
                    //     )

                }
                
               
            }
            //console.log(zcounter)
            
        }
        counter = counter + 1
        //console.log(counter)
    }
    //console.log(routedict)
    console.log("Done,Mark ____________________")
}

//temp();
console.log("start")
test();

