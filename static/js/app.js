function init() {
  d3.json("data/samples.json").then(function (jsonData) {
    let data = jsonData;
    //console.log(data);

    //Capturing the id, which we will call names for the drop-down menu
    let dataNames = data.names;
    var dropDownMenu = d3.select("#selDataset");

    dataNames.forEach(function (name) {
      dropDownMenu.append("option").text(name).property("value", name);
    });

    let selectedID = "940";

    datapull(selectedID);
  });
}

function datapull(selectedID) {
  d3.json("data/samples.json").then(function (jsonData) {
    console.log("1. pull data");
    let data = jsonData;

    let testSubject = data.samples.filter((val) => val.id == selectedID);
    //console.log(testSubject);
    var testSubjectObj = testSubject[0];
    //console.log(testSubjectObj);

    let otu_ids = testSubjectObj.otu_ids;
    //otu_ids = otu_ids.slice(0, 10);
    //console.log(otu_ids);

    let otu_idList = [];
    for (let i = 0; i < otu_ids.length; i++) {
      otu_idList.push(`OTU# ${otu_ids[i]}`);
    }

    let sample_values = testSubjectObj.sample_values;
    //sample_values = sample_values.slice(0, 10);
    //console.log(sample_values);

    let otu_labels = testSubjectObj.otu_labels;
    //otu_labels = otu_labels.slice(0, 10);
    //console.log(otu_labels);

    let testSubjectDemos = data.metadata.filter((val) => val.id == selectedID);
    testSubjectDemos = testSubjectDemos[0];
    console.log(testSubjectDemos);

    let wfreq = Object.values(testSubjectDemos)[6];
    console.log(wfreq);

    let results = {
      idStr: otu_idList,
      ids: otu_ids,
      values: sample_values,
      labels: otu_labels,
    };

    barChart(results);
    bubbleChart(results);
    gaugeChart(wfreq);
    generateTable(testSubjectDemos);
  });
}

//*******************************************//

function barChart(results) {
  console.log("2 bar chart");
  // let results = datapull(selectedID);
  console.log(results);
  let otu_ids = results.idStr.slice(0, 10);
  let sample_values = results.values.slice(0, 10);
  let otu_labels = results.labels.slice(0, 10);
  let otuNumID = results.ids.slice(0, 10);
  let colors = [];
  for (let i = 0; i < sample_values.length; i++) {
    colors.push("rgb(0,0," + (1 - sample_values[i] / 180) + ")");
  }
  console.log(sample_values);

  let trace = {
    x: sample_values,
    y: otu_ids,
    labels: otu_labels,
    mode: "markers",
    marker: {
      color: colors,
      line: {
        width: 1,
      },
    },
    orientation: "h",
    type: "bar",
  };

  let plotdata = [trace];

  let layout = {
    title: "Top 10 Microbial Species Found <br> in Subject's Belly Button",
    titlefont: {
      size: 24,
    },
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4,
    },
    font: {
      family: "Overpass, Open Sans, Raleway",
    },
    yaxis: {
      autorange: "reversed",
      automargin: true,
      ticktext: `<b>${otu_ids}</b>`,
      tickmode: "array",
      tickfont: {
        size: 14,
      },
      xaxis: {
        title: {
          text: "Num. Microbial Species",
          font: {
            family: "Overpass, Open Sans, Raleway",
            size: 14,
          },
        },
      },
    },
  };

  var config = {
    responsive: true,
  };

  Plotly.newPlot("bar", plotdata, layout, config);
}

//*******************************************//

function bubbleChart(results) {
  let otu_ids = results.ids;
  let sample_values = results.values;
  let otu_labels = results.labels;

  var trace1 = {
    x: otu_ids,
    y: sample_values,
    mode: "markers",
    text: otu_labels,
    marker: {
      size: sample_values,
      color: otu_ids,
    },
  };

  var data = [trace1];

  var layout = {
    title: "OTU ID vs Sample Value",
    font: {
      family: "Overpass, Open Sans, Raleway",
    },
    showlegend: false,
    height: 600,
    width: 1200,
  };

  var config = {
    responsive: true,
  };
  Plotly.newPlot("bubble", data, layout, config);
}

//*******************************************//

function generateTable(testSubjectDemos) {
  let body = document.getElementsByClassName("panel-body")[0];
  let tbl = document.createElement("table");
  tbl.setAttribute("id", "table");

  console.log(tbl);

  let tblBody = document.createElement("tbody");

  Object.entries(testSubjectDemos).forEach(function ([key, value]) {
    console.log(key, value);

    let row = document.createElement("tr");

    let key_cell = document.createElement("td");
    key_cell.style.fontWeight = "bold";
    key_cell.style.padding = "10px";
    key_cell.style.fontSize = "16";

    let key_text = document.createTextNode(`${key}:`);
    key_cell.appendChild(key_text);
    row.appendChild(key_cell);

    let value_cell = document.createElement("td");
    value_cell.style.padding = "10px";
    value_cell.style.fontSize = "16";
    let value_text = document.createTextNode(`${value}`);
    value_cell.appendChild(value_text);
    row.appendChild(value_cell);

    tblBody.append(row);
  });

  tbl.appendChild(tblBody);
  body.appendChild(tbl);
}

function gaugeChart(wfreq) {
  var level = parseInt(wfreq) * 20 - 10;
  // Trig to calc meter point
  var degrees = 180 - level,
    radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);
  var path1 =
    degrees < 45 || degrees > 135
      ? "M -0.0 -0.025    L 0.0 0.025 L "
      : "M -0.025 -0.0 L 0.025 0.0 L ";
  // Path: may have to change to create a better triangle
  var mainPath = path1,
    pathX = String(x),
    space = " ",
    pathY = String(y),
    pathEnd = " Z";
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  base_chart = {
    values: [64, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    domain: { x: [0, 0.75] },
    marker: {
      colors: [
        "rgb(255, 255, 255)",
        "rgb(255, 255, 255)",
        "rgb(255, 255, 255)",
        "rgb(255, 255, 255)",
        "rgb(255, 255, 255)",
        "rgb(255, 255, 255)",
        "rgb(255, 255, 255)",
        "rgb(255, 255, 255)",
        "rgb(255, 255, 255)",
        "rgb(255, 255, 255)",
      ],
    },
    name: "Gauge",
    hole: 0.4,
    type: "pie",
    direction: "clockwise",
    rotation: 108,
    showlegend: false,
    hoverinfo: "none",
  };

  meter_chart = {
    values: [72, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    text: ["", "0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
    marker: {
      colors: [
        "#ffffff",
        "#dce5e3",
        "#bbcbc7",
        "#9ab1ac",
        "#7a9992",
        "#5a8178",
        "#3a6960",
        "#325750",
        "#294640",
        "#213531",
      ],
    },
    domain: { x: [0, 0.75] },
    name: "Gauge",
    hole: 0.3,
    type: "pie",
    direction: "clockwise",
    rotation: 90,
    showlegend: false,
    textinfo: "text",
    textposition: "inside",
    hoverinfo: "none",
  };

  data = [base_chart, meter_chart];

  var layout = {
    shapes: [
      {
        type: "path",
        path: "path",
        fillcolor: "#61424B",
        line: {
          color: "#61424B",
        },
      },
    ],
    font: {
      family: "Overpass, Open Sans, Raleway",
    },
    xaxis: {
      zeroline: false,
      showticklables: false,
      showgrid: false,
      range: [-1, 1],
    },
    yaxis: {
      showticklabels: false,
      showgrid: false,
      zeroline: false,
      range: [-1, 1],
    },
    shapes: [
      {
        type: "path",
        path: "M 0.235 0.5 L 0.24 0.65 L 0.245 0.5 Z",
        fillcolor: "rgba(44, 160, 101, 0.5)",
        line: {
          width: 0.5,
        },
        xref: "paper",
        yref: "paper",
      },
    ],
    annotations: [
      {
        xref: "paper",
        yref: "paper",
        x: 0.23,
        y: 0.45,
        text: "50",
        showarrow: false,
      },
    ],
  };
  Plotly.newPlot("gauge", data, layout);
}

init();

d3.selectAll("#selDataset").on("change", subjectChanged);

function subjectChanged() {
  let selectedID = d3.select("#selDataset").node().value;

  d3.selectAll("#table").remove();

  datapull(selectedID);
}
