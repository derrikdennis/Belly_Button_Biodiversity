# Belly Button Biodiversity - Interactive Visualizations and Dashboards <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->
- [Background](#background)
- [Step 1: Plotly Bar, Panel and Scattplot Graphs](#step-1-plotly-bar-panel-and-scattplot-graphs)
- [Step 2: Plotly Gauge Chart](#step-2-plotly-gauge-chart)
- [Results](#results)


## Background

In this assignment, I will use plotly graphs to build an interactive dashboard using the Belly Button Biodiversity dataset.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly Bar, Panel and Scattplot Graphs

1. Use the D3 library to read in `samples.json`.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

- Use `sample_values` as the values for the bar chart.

- Use `otu_ids` as the labels for the bar chart.

- Use `otu_labels` as the hovertext for the chart.

3. Create a bubble chart that displays each sample.

- Use `otu_ids` for the x values.

- Use `sample_values` for the y values.

- Use `sample_values` for the marker size.

- Use `otu_ids` for the marker colors.

- Use `otu_labels` for the text values.

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

6. Update all of the plots any time that a new sample is selected.

Additionally, you are welcome to create any layout that you would like for your dashboard. 

## Step 2: Plotly Gauge Chart

The following task is advanced and therefore optional.

- Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.

- You will need to modify the example gauge code to account for values ranging from 0 through 9.

- Update the chart whenever a new sample is selected.

## Results

My dashboard is located at [derrikdennis.github.io/Belly_Button_Biodiversity](https://derrikdennis.github.io/Belly_Button_Biodiversity)
