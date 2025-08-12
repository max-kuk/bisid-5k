document.addEventListener('DOMContentLoaded', () => {

  const modalities = ["Spectral", "RGB", "MS", "HS"];

  // Model accuracy data (mean only)
  const modelData = {
    "Spectral": {
      models: ["DT", "RF", "MLP"],
      acc: [89.13, 94.62, 95.29]
    },
    "RGB": {
      models: ["2D-R18", "2D-R34", "2D-R50"],
      acc: [98.62, 97.59, 96.22]
    },
    "MS": {
      models: ["3D-R18", "3D-R34", "3D-R50"],
      acc: [99.60, 99.55, 99.20]
    },
    "HS": {
      models: ["3D-R18", "3D-R34", "3D-R50"],
      acc: [98.89, 98.76, 98.53]
    }
  };

  // Define a single color map for all models
  const modelColorMap = {
    "DT": "rgba(255, 99, 132, 0.9)",
    "RF": "rgba(255, 206, 86, 0.9)",
    "MLP": "rgba(54, 162, 235, 0.9)",
    "2D-R18": '#d4d4d4',
    "2D-R34": '#ff7a7a',
    "2D-R50": '#9e9eff',
    "3D-R18": '#bebebe',
    "3D-R34": '#fe4d4e',
    "3D-R50": '#5c5cff',

  };

  // Collect ALL unique model names from ALL modalities
  const allModelNames = Array.from(
    new Set(Object.values(modelData).flatMap(d => d.models))
  );

  // Create one trace for each unique model
  const modelTraces = allModelNames.map(model => {
    const color = modelColorMap[model];
    return {
      x: modalities,
      // Use a null value if a model doesn't exist in a modality
      y: modalities.map(m => {
        const modelIdx = modelData[m].models.indexOf(model);
        return modelIdx !== -1 ? modelData[m].acc[modelIdx] : null;
      }),
      name: model,
      type: 'bar',
      marker: {
        color: color,
        line: { color: color }
      },
      text: modalities.map(m => {
        const modelIdx = modelData[m].models.indexOf(model);
        return modelIdx !== -1 ? modelData[m].acc[modelIdx].toFixed(2) : '';
      }),
      textposition: 'inside',
      textfont: {
        color: 'white',
        size: 11,
        family: 'Noto Sans, sans-serif'
      },
      hovertemplate: '<b>%{fullData.name}</b><br>Modality: %{x}<br>Accuracy: %{y:.2f}%<extra></extra>',
      showlegend: true
    };
  });

  const modelLayout = {
    title: {
      text: "Accuracy by Data Modality",
      x: 0.5,
      font: { size: 17 }
    },
    barmode: 'group',
    bargroupgap: 0.1,
    plot_bgcolor: '#FAFAFA',
    paper_bgcolor: 'white',
    font: { family: 'Noto Sans, sans-serif' },
    legend: {
      orientation: 'h',
      x: 0.5,
      xanchor: 'center',
      y: -0.1,
      bgcolor: 'rgba(255,255,255,0.8)',
      bordercolor: '#DDD',
      borderwidth: 1,
      font: { size: 12 }
    },
    //margin: { l: 60, r: 60, t: 80, b: 80 },
    xaxis: {
      title: '',
      tickfont: { size: 12 },
      titlefont: { size: 14 },
      gridcolor: '#E0E0E0'
    },
    yaxis: {
      title: 'Accuracy (%)',
      range: [85, 100],
      tickfont: { size: 12 },
      titlefont: { size: 14 },
      gridcolor: '#E0E0E0'
    }
  };

  // Existing bar chart data & layout
  const barData = [
    {
      x: ['3D ResNet-18', '3D ResNet-34', '3D ResNet-50'],
      y: [97.07, 97.20, 96.84],
      name: '32x32',
      type: 'bar',
      xaxis: 'x1',
      yaxis: 'y1',
      marker: {
        color: '#bebebe',
        line: { color: '#bebebe', width: 1 }
      },
      text: ['97.07', '97.20', '96.84'],
      textposition: 'middle',
      textfont: { color: 'white', size: 12 },
      hovertemplate: '<b>%{fullData.name}</b><br>Acc (%): %{y}<br><extra></extra>'
    },
    {
      x: ['3D ResNet-18', '3D ResNet-34', '3D ResNet-50'],
      y: [98.22 - 97.07, 98.36 - 97.20, 98.44 - 96.84],
      name: '64x64',
      type: 'bar',
      xaxis: 'x1',
      yaxis: 'y1',
      marker: { color: '#fe4d4e', line: { color: '#fe4d4e', width: 1 } },
      customdata: [98.22, 98.36, 98.44],
      text: ['98.22', '98.36', '98.44'],
      textposition: 'middle',
      textfont: { color: 'white', size: 12 },
      hovertemplate: '<b>%{fullData.name}</b><br>Acc (%): %{customdata}<br><extra></extra>'
    },
    {
      x: ['3D ResNet-18', '3D ResNet-34', '3D ResNet-50'],
      y: [99.11 - 98.22, 98.76 - 98.36, 99.20 - 98.44],
      name: '96x96',
      type: 'bar',
      xaxis: 'x1',
      yaxis: 'y1',
      marker: { color: '#5c5cff', line: { color: '#5c5cff', width: 1 } },
      customdata: [99.11, 98.76, 99.20],
      text: ['99.11', '98.76', '99.20'],
      textposition: 'middle',
      textfont: { color: 'white', size: 12 },
      hovertemplate: '<b>%{fullData.name}</b><br>Acc (%): %{customdata}<br><extra></extra>'
    }
  ];

  const barLayout = {
    grid: { rows: 1, columns: 1, pattern: 'independent' },
    barmode: 'stack',
    title: {
      text: 'Performance of 3D ResNet models using different spatial resolutions for MS data (5 spectral bands)',
      x: 0.5,
      font: { size: 17 }
    },
    plot_bgcolor: '#FAFAFA',
    paper_bgcolor: 'white',
    font: { family: 'Noto Sans, sans-serif' },
    legend: {
      orientation: 'h',
      x: 0.5,
      xanchor: 'center',
      y: -0.1,
      bgcolor: 'rgba(255,255,255,0.8)',
      bordercolor: '#DDD',
      borderwidth: 1,
      font: { size: 12 }
    },
    margin: { l: 60, r: 60, t: 80, b: 80 },
    annotations: [],
    xaxis: {
      title: '',
      domain: [0, 1],
      tickfont: { size: 12 },
      titlefont: { size: 14 },
      gridcolor: '#E0E0E0'
    },
    yaxis: {
      title: 'Accuracy (%)',
      range: [85, 100],
      tickfont: { size: 12 },
      titlefont: { size: 14 },
      gridcolor: '#E0E0E0'
    }
  };

  const plotlyConfig = { displayModeBar: false };

  const barChartElement = document.getElementById('bar-chart');
  const modelChartElement = document.getElementById('model-chart');

  if (barChartElement) {
    Plotly.newPlot('bar-chart', barData, barLayout, plotlyConfig);
  }
  if (modelChartElement) {
    Plotly.newPlot('model-chart', modelTraces, modelLayout, plotlyConfig);
  }
});