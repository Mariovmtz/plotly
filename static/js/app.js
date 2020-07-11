var sampleData

d3.json("samples.json").then((data) => {
    let selectTag = d3.select("#selDataset");    
    data.names.forEach(element => selectTag.append('option').attr('value', element).text(element));
    sampleData = data;

});

function optionChanged(value){
    
    let rowMeta = sampleData.metadata.filter(row => row.id === parseInt(value))[0];
    let rowSample = sampleData.samples.filter(row => row.id === value)[0]
    fillMetaData(rowMeta);
    createBar(rowSample);
    createBubble(rowSample);
    createGauge(rowMeta.wfreq);

}

function fillMetaData(data){
    let selectTag = d3.select("#sample-metadata"); 
    let props = Object.entries(data);

    selectTag.selectAll("p").remove();
    props.forEach(element => selectTag.append('p').text(`${element[0]} : ${element[1]}`));
}

function createBar(data){

    let trace = [{
        type: 'bar',
        y: data.otu_ids.sort((a, b) => a - b).map(element => `OTU ${element}`),
        x: data.sample_values,
        text: data.otu_labels,
        orientation: 'h'
      }];
      let layout = {
        title: 'Numbeer of bacteria per IF'
      };
      Plotly.newPlot('bar', trace, layout);
}

function createBubble(data){
    let trace = [{
        x: data.otu_ids.sort((a, b) => a - b),
        y: data.sample_values,
        text: data.otu_labels,
        mode: 'markers',
        marker: {
          color:data.otu_ids.map(element => getRandomColor()),
          size: data.sample_values,
          sizemode: 'area',
          sizeref: 0.05
        }
      }];
      let layout = {
        title: 'Weights of bacteria in belly button'
      };

        Plotly.newPlot('bubble', trace, layout);
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function createGauge(data){

    let trace = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: data,
            title: { text: "Scrubs per week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: { axis: { range: [0, 9], } ,
                     bar: {color: "red"},
                     steps: [
                            {range: [0, 1], color: 'hsl(196, 100%, 5%)'},
                            {range: [1, 2], color: 'hsl(196, 100%, 10%)'},
                            {range: [2, 3], color: 'hsl(196, 100%, 15%)'},
                            {range: [3, 4], color: 'hsl(196, 100%, 20%)'},
                            {range: [4, 5], color: 'hsl(196, 100%, 25%)'},
                            {range: [5, 6], color: 'hsl(196, 100%, 30%)'},
                            {range: [6, 7], color: 'hsl(196, 100%, 35%)'},
                            {range: [7, 8], color: 'hsl(196, 100%, 40%)'},
                            {range: [8, 9], color: 'hsl(196, 100%, 45%)'}
                        ]
        
        }
            
        }
    ];
    let layout = {
        title: 'Belly button washing frequency'
      };
    Plotly.newPlot('gauge', trace, layout);
}

