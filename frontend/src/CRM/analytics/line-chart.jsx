import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChartCustom = ({ analyticsData, year }) => {
  console.log(analyticsData);
  return (
    <>
      <h3 style={{ marginLeft: "3.6rem" }}>Sales {year}</h3>
      <LineChart
        width={890}
        height={300}
        data={analyticsData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </>
  );
};

export default LineChartCustom;
