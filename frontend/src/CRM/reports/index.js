import React from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TableExportButton from "./TableExportButton";
import CustomTable from "./CustomTable";

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

const data = [
  { name: "Keanu Reeves", profession: "Actor" },
  { name: "Lionel Messi", profession: "Football Player" },
  { name: "Cristiano Ronaldo", profession: "Football Player" },
  { name: "Jack Nicklaus", profession: "Golf Player" },
];

export default function Reports() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Reports"} />
      <Sidebar currentPage={16} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <CustomTable tableData={data} />
        <TableExportButton tableData={data} />
        {/* PUT YOUR CONTENT HERE -> RECOMMEND: GRID AND PAPERS MATERIAL UI */}
      </main>
    </div>
  );
}
