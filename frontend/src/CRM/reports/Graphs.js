import React from "react";
import { Bar, Line } from "react-chartjs-2";

//data is key:value, key is x, value is y
const BarGraph = ({ xData, yData, period="All Time" }) => {
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
    labels: xData,
    datasets: [
      {
        label: "Items Sold",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: yData,
      },
    ],
  };
  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Sales Over a Period of Time",
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
        label: "Items Sold",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: yData,
      },
    ],
  };
  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Sales Over a Period of Time",
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

export { BarGraph, LineGraph, DoughnutGraph };
