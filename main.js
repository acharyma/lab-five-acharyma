//GitHub Pages Update
d3.csv('coffee-house-chains.csv', d3.autoType).then(data=>{
    let type = document.querySelector("#group-by");
    let direction = 0;
    let pressed = 0;

    console.log(data);
    const margin = ({top: 20, right: 20, bottom: 20, left: 20});
    const width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    let domainStore = d3.extent(data, (d => d.stores));
    const svg = d3.select(".chart").append("svg").attr("width", width + margin.left + margin.right + 50) .attr("height", height + margin.top + margin.bottom + 50) .append("g") .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    let xScale = d3.scaleBand().domain(data.map(d => d.company)).rangeRound([0,width]).paddingInner(0.0);
    let yScale = d3.scaleLinear().domain(domainStore).range([height, 0]);


    update(data, "stores");

  // CHART INIT ------------------------------



// create svg with margin convention

// create scales without domains

// create axes and axis title containers

// (Later) Define update parameters: measure type, sorting direction

// CHART UPDATE FUNCTION -------------------
function update(data, type){

    

    console.log(type)
    // update domains
    console.log(data.map((d) => d.revenue));
    console.log(data.map((d) => d.stores));

    if (pressed == 1 && type == "revenue") {
        if (direction == 0) {
          data.sort(function (a, b) {
            return b.revenue - a.revenue;
          });
        } else {
          data.sort(function (a, b) {
            return a.revenue - b.revenue;
          });
        }
      }
    if (pressed == 1 && type == "stores") {
        if (direction == 0) {
          data.sort(function (a, b) {
            return b.stores - a.stores;
          });
        } else {
          data.sort(function (a, b) {
            return a.stores - b.stores;
          });
        }
      }


    xScale.domain(data.map((d) => d.company)); //was data
    xScale.domain(data.map((d) => d.company)); //was data
    type == "revenue"
      ? yScale.domain(d3.extent(data, (d) => d.revenue))
      : yScale.domain(d3.extent(data, (d) => d.stores));

    const bars = svg.selectAll(".bar").data(data);
    

    type == "revenue"
      ? svg
          .selectAll("#rect")
          .data(data, (d) => d)
          .enter()
          .append("rect")
          .attr("class", "rect")
          .attr("x", (d, i) => i * 76 + 69)
          .attr("y", (d) => yScale(d.revenue) + 10)
          .attr("height", (d) => height - yScale(d.revenue) + 20)
          .attr("width", 40)
          .attr("fill", "lightblue")
          .attr("opacity", 0.0)
          .transition()
          .duration(1000)
          .attr("fill", "blue")
          .attr("opacity", 1.0)
      : svg
          .selectAll("#rect")
          .data(data, (d) => d)
          .enter()
          .append("rect")
          .attr("class", "rect")
          .attr("x", (d, i) => i * 76 + 69)
          .attr("y", (d) => yScale(d.stores) + 10)
          .attr("height", (d) => height - yScale(d.stores) + 20)
          .attr("width", 40)
          .attr("fill", "skyblue")
          .attr("opacity", 0.0)
          .transition()
          .duration(1000)
          .attr("fill", "darkorange")
          .attr("opacity", 1.0)

    
        const xAxis = d3.axisBottom().scale(xScale).ticks(5, "s");

        svg
        .append("g")
        .attr("class", "axis x-axis")
        .call(xAxis)
        .attr("transform", `translate(50, ${height + 30})`);
    
        const yAxis = d3.axisLeft().scale(yScale).ticks(5, "s");
    
        svg
        .append("g")
        .attr("class", "axis y-axis")
        .call(yAxis)
        .attr("transform", `translate(50, 30)`);
    
        svg
        .append("text")
        .attr("x", 5)
        .attr("y", 20)
        .text(type + "");

    if (direction == 0 && pressed == 1) {
        direction = 1;
        pressed = 0;
      } else if (direction == 1 && pressed == true) {
        direction = 0;
        pressed = 0;
      }
    console.log(direction)

}

    type.addEventListener("change", () => {
        // console.log(data);
        // console.log(type.value);
        svg
        .selectAll("rect")
        .transition()
        .duration(1000)
        .attr("fill", "black")
        .attr("opacity", 0.0)
        .remove();
        svg.selectAll("g").remove();
        svg.selectAll("text").remove();
        update(data, type.value);
    });

    document.querySelector("#sort").addEventListener("click", (e) => {
        pressed = 1;
        svg
          .selectAll("rect")
          .transition()
          .duration(1000)
          .attr("fill", "black")
          .attr("opacity", 0.0)
          .remove();
        svg.selectAll("g").remove();
        svg.selectAll("text").remove();
        update(data, type.value);
    });

    

});



