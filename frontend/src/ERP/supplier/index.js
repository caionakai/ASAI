import React from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

import axios from "axios";

import RegisterSupplier from "./register-supplier";

import SupplierTable from "./supplier-table";

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

export default function Supplier() {
  const classes = useStyles();

  const [openModalSupplier, setOpenModalSupplier] = React.useState(false);

  const [supplierInputs, setSupplierInputs] = React.useState({
    address: "",
    name: "",
    email: "",
  });

<<<<<<< HEAD
  const [supplierId, setSupplierId] = React.useState(null);

=======
>>>>>>> supplier crud operation
  const handleChange = (evt) => {
    const value = evt.target.value;
    setSupplierInputs({ ...supplierInputs, [evt.target.name]: value });
  };

  const toggleModalSupplier = () => {
    setOpenModalSupplier((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Supplier"} />
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
            Supplier's Table
          </h2>
          <Button
            color="primary"
            variant="outlined"
            className="form__button"
            style={{
              height: "100%",
            }}
            onClick={() => {
              setSupplierInputs({
                address: "",
                name: "",
                email: "",
              });
              setSupplierId(null); // this is the difference between edit and create a new supplier
              toggleModalSupplier();
            }}
          >
            Register Supplier
          </Button>
        </div>

        <SupplierTable
          setSupplierInputs={setSupplierInputs}
          toggleModalSupplier={toggleModalSupplier}
          setSupplierId={setSupplierId}
        />

        <RegisterSupplier
          open={openModalSupplier}
          handleClose={toggleModalSupplier}
          handleChange={handleChange}
          supplierInputs={supplierInputs}
          supplierId={supplierId}
        />
      </main>
    </div>
  );
}
