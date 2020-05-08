import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";

//data is key:value, key is x, value is y
const BarGraph = ({ xData, yData, period = "All Time" }) => {
  const state = {
    labels: xData,
    datasets: [
      {
        label: "Pieces Sold",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: yData,
      },
    ],
  };
  return (
    <div>
      <Bar
        data={state}
        options={{
          responsive: true,
          title: {
            display: true,
            text: "Sales per Brand (" + period.toUpperCase() + ")",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

const LineGraph = ({ xData, yData, period }) => {
  const state = {
    labels: yData,
    datasets: [
      {
        label: "Items Sold",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: xData,
      },
    ],
  };
  return (
    <div>
      <Line
        data={state}
        options={{
          responsive: true,
          title: {
            display: true,
            text: "Sales Over a Period of Time (" + period.toUpperCase() + ")",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

const DoughnutGraph = ({ xData, yData, period }) => {
  const state = {
    labels: xData,
    datasets: [
      {
        data: yData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <Doughnut
        data={state}
        options={{
          responsive: true,
          title: {
            display: true,
            text: "Sales Based on Categories (" + period.toUpperCase() + ")",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

const LineBarGraph = ({ xData, yData, moneyData, period = "all time" }) => {
  const data = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: "Items Sold",
        type: "line",
        data: xData,
        fill: false,
        borderColor: "black",
        backgroundColor: "black",
        pointBorderColor: "red",
        pointBackgroundColor: "red",
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "red",
        yAxisID: "y-axis-2",
      },
      {
        type: "bar",
        label: "Total Price",
        data: moneyData,
        fill: false,
        backgroundColor: "yellow",  
        borderColor: "black",
        hoverBackgroundColor: "yellow",
        hoverBorderColor: "yellow",
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options = {
    responsive: true,
    labels: xData,
    tooltips: {
      mode: "label",
    },
    elements: {
      line: {
        fill: false,
      },
    },
    title: {
      display: true,
      text: "Sales Over a Period of Time (" + period.toUpperCase() + ")",
      fontSize: 20,
    },
    legend: {
      display: true,
      position: "right",
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: true,
          },

          labels: yData,
        },
      ],
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            display: true,
          },
          labels: {
            show: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export { BarGraph, LineGraph, DoughnutGraph, LineBarGraph };
