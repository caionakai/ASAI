import React from "react";
import { Bar } from "react-chartjs-2";

//data is key:value, key is x, value is y
const BarGraph = ({ xData, yData }) => {
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
            text: "Sales per Brand",
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

export default BarGraph;
