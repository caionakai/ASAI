import React from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

import axios from "axios";

import RegisterSalesdata from "./register-salesdata";

import SalesdataTable from "./salesdata-table";

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

export default function Salesdata() {
  const classes = useStyles();

  const [openModalSalesdata, setOpenModalSalesdata] = React.useState(false);

  const [SalesdataInputs, setSalesdataInputs] = React.useState({
    details: "",
  });

  const [SalesdataId, setSalesdataId] = React.useState(null);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setSalesdataInputs({ ...SalesdataInputs, [evt.target.details]: value });
  };

  const toggleModalSalesdata = () => {
    setOpenModalSalesdata((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Salesdata"} />
      <Sidebar currentPage={7} />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h2
            style={{
              height: "100%",
              margin: 0,
            }}
          >
            Salesdata's Table
          </h2>
          <Button
            color="primary"
            variant="outlined"
            className="form__button"
            style={{
              height: "100%",
            }}
            onClick={() => {
              setSalesdataInputs({
                details: "",
                });
              setSalesdataId(null); // this is the difference between edit and create a new Salesdata
              toggleModalSalesdata();
            }}
          >
            New Salesdata info
          </Button>
        </div>

        <SalesdataTable
          setSalesdataInputs={setSalesdataInputs}
          toggleModalSalesdata={toggleModalSalesdata}
          setSalesdataId={setSalesdataId}
        />

        <RegisterSalesdata
          open={openModalSalesdata}
          handleClose={toggleModalSalesdata}
          handleChange={handleChange}
          SalesdataInputs={SalesdataInputs}
          SalesdataId={SalesdataId}
        />
      </main>
    </div>
  );
}
