// selections
var idSelect = d3.select("#selDataset");
var demographicsTable = d3.select("#sample-metadata");
var barChart = d3.select("#bar");
var bubbleChart = d3.select("bubble");

// dropdown menu
function dropDown() {
    resetData();
    // read in samples.json
    d3.json("data/samples.json").then((data => {
        data.names.forEach((name => {
            var selection = idSelect.append("option");
            selection.text(name);
        })); 
        // default id
        var dropDownId = idSelect.property("value")
        charts(dropDownId);
    })); 
} 

// reset
function resetData() {
    demographicsTable.html("");
    barChart.html("");
    bubbleChart.html("");
}; 

// table
function charts(id) {
    d3.json("data/samples.json").then((data => {
        var sampleMetadata = data.metadata.filter(participant => participant.id == id)[0];

        Object.entries(sampleMetadata).forEach(([key, value]) => {
            var table = demographicsTable.append("ul");
            var dataPoint = table.append("li");
            dataPoint.text(`${key}: ${value}`);
        }); 

        var individualSample = data.samples.filter(sample => sample.id == id)[0];
        var otuIds = [];
        var sampleValues = [];
        var otuLabels = [];

        Object.entries(individualSample).forEach(([key, value]) => {
            switch (key) {
                case "otu_ids":
                    otuIds.push(value);
                    break;
                case "sample_values":
                    sampleValues.push(value);
                    break;
                case "otu_labels":
                    otuLabels.push(value);
                    break;
                default:
                    break;
            } 
        }); 

        // bar chart
        var topOtuIds = otuIds[0].slice(0, 10).reverse();
        var topOtuLabels = otuLabels[0].slice(0, 10).reverse();
        var topSampleValues = sampleValues[0].slice(0, 10).reverse();
        var topOtuIdsFormatted = topOtuIds.map(otuID => "OTU " + otuID);

        var barTrace = {
            x: topSampleValues,
            y: topOtuIdsFormatted,
            text: topOtuLabels,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgb(31,119,180)'
            }
        };
        var barData = [barTrace];

        // layout
        var barLayout = {
            height: 750,
            width: 1075,
        }
        Plotly.newPlot("bar", barData, barLayout);

    })); 
};

function optionChanged(id) {
    resetData();
    charts(id);
} 
dropDown();