import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

import LineChartCustom from "./line-chart";

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

  const [analyticsData, setAnalyticsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRequest = async (year) => {
    await axios
      .get(`http://localhost:8000/crm/analytics/${year}`)
      .then(function (response) {
        const formatedData = Object.keys(response.data.res).map((val) => {
          return {
            name: val,
            sales: response.data.res[val],
          };
        });
        setAnalyticsData((prevState) => {
          let tmpAnalyticsData = [...prevState];
          tmpAnalyticsData.push(formatedData);
          return tmpAnalyticsData;
        });
        setIsLoading(false);
      })
      .catch(function (error) {
        if (error.response && error.response.status == 504) {
          setIsLoading(true);
          getRequest(year);
        }
      });
  };

  useEffect(() => {
    for (let i = 2016; i <= 2019; i++) {
      getRequest(i);
    }
  }, []);

  useEffect(() => {
    console.log(analyticsData);
  }, [analyticsData]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Analytics"} />
      <Sidebar currentPage={10} />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {isLoading ? (
          <CircularProgress />
        ) : (
          analyticsData.map((analyData, idx) => {
            return (
              <LineChartCustom analyticsData={analyData} year={2016 + idx} />
            );
          })
        )}
      </main>
    </div>
  );
}
