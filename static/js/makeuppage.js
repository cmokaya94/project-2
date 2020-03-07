// OUR INITIAL FUNCTION WHICH WILL GENERATE THE EMPTY PAGE WITH BLANK CHARTS?
function init() {
    d3.json("test.json").then((data) => {
        
        const categories = ["foundation","blush", "eyeliner", "eyeshadow"]

        var top_blush = data[0];
        var bottom_blush = data[2];
        var top_blush_rating = data[9];

        //FOR DROPDOWN MENU (WE'LL USE THIS TO GENERATE THE CATEGORIES ONCE THE FACE IS CLICKED ON)
        categories.forEach((obj) => {
            var options = d3.select("#category").append("option");
            options.text(`${obj.id}`).attr("value", `${obj.id}`);
        }) 

        //FOR DROPDOWN MENU (WE'LL USE THIS TO GENERATE THE PRODUCTS ONCE THE FACE IS CLICKED ON)
        top_blush.forEach((obj) => {
            var options = d3.select("#selID").append("option");
            options.text(`${obj.id}`).attr("value", `${obj.id}`);
        }) 

        //FIRST PLOT
        var trace1 = {
            x: samples[0].sample_values.slice(0,10),
            y: samples[0].otu_ids.slice(0,10).map(val => `OTU ${val}`),
            type: "bar",
            orientation: "h",
            name: "Belly Button Samples",
            text: samples[0].otu_labels.slice(0,10)
        };
        
        // Create the data array for the plot
        var data = [trace1];
        
        // Define the plot layout
        var layout = {
            xaxis: { title: "Values" },
            yaxis: { title: "Otu Names" }
        };
        
        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("product_rating", data, layout);

        //BUBBLE PLOT
        var trace3 = {
            x: samples[0].otu_ids,
            y: samples[0].sample_values,
            mode: "markers",
            marker: {
                size:samples[0].sample_values,
                color: samples[0].otu_ids
            },
            name: "Belly Button Samples",
            text: samples[0].otu_labels
        };
        
        // Create the data array for the plot
        var data = [trace3];
        
        // Define the plot layout
        var layout = {
            xaxis: { title: "OTU ID" },
        };
        
        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bubbleplot", data, layout);

        //GAUGE PLOT
        var data = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: metadata[0].wfreq,
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge",
            gauge: {
                axis: { range: [null, 9] },
                steps: [
                { range: [0, 1], color: "lightgray" },
                { range: [1, 2], color: "gray" },
                { range: [2, 3], color: "lightgray" },
                { range: [3, 4], color: "gray" },
                { range: [4, 5], color: "lightgray" },
                { range: [5, 6], color: "gray" },
                { range: [6, 7], color: "lightgray" },
                { range: [7, 8], color: "gray" },
                { range: [8, 9], color: "lightgray" },
                ],
            }
            }
        ];
        
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('accelplot', data, layout);


    });
    // speech();
};
// init();

let voice;

function setup() {
  voice = new p5.Speech();
  voice.onLoad = voiceReady;
  noLoop();
}

// function voiceReady() {
	// voice.listVoices();
// }

function speech() {
  voice.setVoice("Google UK English Female");
	voice.speak("Please click a part of the face");
}  

speech();