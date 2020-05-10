import React from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

import axios from "axios";

import RegisterPurchase from "./register-purchase";

import PurchaseTable from "./purchase-table";

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

export default function Purchase() {
  const classes = useStyles();

  const [openModalSupplier, setOpenModalSupplier] = React.useState(false);

  const [purchaseInputs, setPurchaseInputs] = React.useState({
    name: "",
    price: "",
    quantity: "",
    date: "",
  });

  const [purchaseId, setPurchaseId] = React.useState(null);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setPurchaseInputs({ ...purchaseInputs, [evt.target.name]: value });
  };

  const toggleModalSupplier = () => {
    setOpenModalSupplier((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Purchase"} />
      <Sidebar currentPage={4} />
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
            Purchase's Table
          </h2>
          <Button
            color="primary"
            variant="outlined"
            className="form__button"
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
            onClick={() => {
              setPurchaseInputs({
                address: "",
                name: "",
                email: "",
              });
              setPurchaseId(null); // this is the difference between edit and create a new supplier
              toggleModalSupplier();
            }}
          >
            Register Purchase
          </Button>
        </div>

        <PurchaseTable
          setPurchaseInputs={setPurchaseInputs}
          toggleModalSupplier={toggleModalSupplier}
          setPurchaseId={setPurchaseId}
        />

        <RegisterPurchase
          open={openModalSupplier}
          handleClose={toggleModalSupplier}
          handleChange={handleChange}
          purchaseInputs={purchaseInputs}
          purchaseId={purchaseId}
        />
      </main>
    </div>
  );
}
