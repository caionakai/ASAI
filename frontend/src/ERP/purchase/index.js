import React from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

import Swal from "sweetalert2";

import PurchaseTable from "./purchase-table";
import RegisterSupplier from "./register-supplier";
import RegisterPurchase from "./register-purchase";

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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openModalSupplier, setOpenModalSupplier] = React.useState(false);
  console.log(openModalSupplier);
  const handleOpenModalSupplier = () => {
    setOpenModalSupplier(true);
  };

  const handleCloseModalSupplier = () => {
    setOpenModalSupplier(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Purchase"} />
      <Sidebar currentPage={4} />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div>
          <Button
            color="primary"
            variant="outlined"
            className="form__button"
            style={{ marginTop: "1rem" }}
            onClick={handleOpen}
          >
            Register Purchase
          </Button>

          <Button
            color="primary"
            variant="outlined"
            className="form__button"
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
            onClick={handleOpenModalSupplier}
          >
            Register Supplier
          </Button>

          <h2>History</h2>
          <PurchaseTable />

          <RegisterPurchase open={open} handleClose={handleClose} />

          <RegisterSupplier
            open={openModalSupplier}
            handleClose={handleCloseModalSupplier}
          />
        </div>
      </main>
    </div>
  );
}
