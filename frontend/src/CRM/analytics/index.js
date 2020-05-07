import React from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = {
  january: 100,
  february: 200,
  march: 300,
  april: 40,
  may: 79,
};

const formatedData = Object.keys(data).map((val) => {
  return {
    name: val,
    vendas: data[val],
  };
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Analytics() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Analytics"} />
      <Sidebar currentPage={10} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <LineChart
          width={500}
          height={300}
          data={formatedData}
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
            dataKey="vendas"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </main>
    </div>
  );
}
