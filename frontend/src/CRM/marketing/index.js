import React from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

import axios from "axios";


import MarketingTable from "./marketing-table";

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

export default function Marketing() {
  const classes = useStyles();

  const [openModalMarketing, setOpenModalMarketing] = React.useState(false);

  const [marketingInputs, setMarketingInputs] = React.useState({
    address: "",
    name: "",
    email: "",
  });

  const [marketingId, setMarketingId] = React.useState(null);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setMarketingInputs({ ...marketingInputs, [evt.target.name]: value });
  };

  const toggleModalMarketing = () => {
    setOpenModalMarketing((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Marketing"} />
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
            Marketing's Table
          </h2>
          <Button
            color="primary"
            variant="outlined"
            className="form__button"
            style={{
              height: "100%",
            }}
            onClick={() => {
              setMarketingInputs({
                address: "",
                name: "",
                email: "",
              });
              setMarketingId(null); // this is the difference between edit and create a new Marketing
              toggleModalMarketing();
            }}
          >
            Register Marketing
          </Button>
        </div>

        <MarketingTable
          setMarketingInputs={setMarketingInputs}
          toggleModalMarketing={toggleModalMarketing}
          setMarketingId={setMarketingId}
        />

          </main>
    </div>
  );
}
