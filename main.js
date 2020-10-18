d3.csv('coffee-house-chains.csv', d3.autoType).then(data=>{
    console.log(data);
    const margin = ({top: 20, right: 20, bottom: 20, left: 20});
    const width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    let domainStore = d3.extent(data, (d => d.stores));
    const svg = d3.select(".chart").append("svg").attr("width", width + margin.left + margin.right + 50) .attr("height", height + margin.top + margin.bottom + 50) .append("g") .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    let xScale = d3.scaleBand().domain(data.map(d => d.company)).rangeRound([0,width]).paddingInner(0.0);
    let yScale = d3.scaleLinear().domain(domainStore).range([height, 0]);


    svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "rect")
    .attr("x", (d, i) => i * 76 + 69)
    .attr("y", (d) => yScale(d.stores) + 10)
    .attr("width", 20)
    .attr("height", (d) => height - yScale(d.stores) + 20)
    .attr("fill", "orange")
    .attr("opacity", 0.0)
    .transition()
    .duration(1000)
    .attr("fill", "darkorange")
    .attr("opacity", 1.0);

    const xAxis = d3.axisBottom().scale(xScale).ticks(5, "s");
    
    svg
    .append("g")
    .attr("class", "axis x-axis")
    .call(xAxis)
    .attr("transform", `translate(40, ${height + 30})`);

  const yAxis = d3.axisLeft().scale(yScale).ticks(5, "s");
  svg
    .append("g")
    .attr("class", "axis y-axis")
    .call(yAxis)
    .attr("transform", `translate(50, 30)`);

  svg.append("text").attr("x", 15).attr("y", 15).text("stores");





    
    
});

// CHART INIT ------------------------------

// create svg with margin convention

// create scales without domains

// create axes and axis title containers

// (Later) Define update parameters: measure type, sorting direction

// CHART UPDATE FUNCTION -------------------
function update(data){
    // update domains
    console.log(data.map((d) => d.revenue));
    console.log(data.map((d) => d.stores));

    xScale.domain(data.map((d) => d.company)); //was data

    const bars = svg.selectAll(".bar").data(data);

    svg
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
          .attr("fill", "blue")
          .attr("opacity", 1.0);

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
    .attr("x", 15)
    .attr("y", 20)
    .text(type + "");

}

