// selections
var idSelect = d3.select("#selDataset");
var demographicsTable = d3.select("#sample-metadata");
var barChart = d3.select("#bar");
var bubbleChart = d3.select("bubble");

// dropdown menu
function init() {
    resetData();
    // read in samples.json
    d3.json("data/samples.json").then((data => {
        data.names.forEach((name => {
            var option = idSelect.append("option");
            option.text(name);
        })); 
        // default id
        var initId = idSelect.property("value")
        plotCharts(initId);
    })); 
} 

// reset
function resetData() {
    demographicsTable.html("");
    barChart.html("");
    bubbleChart.html("");
}; 

function optionChanged(id) {
    resetData();
    plotCharts(id);
} 
init();