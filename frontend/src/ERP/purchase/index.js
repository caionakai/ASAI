import React from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
<<<<<<< HEAD
import Button from "@material-ui/core/Button";

import Swal from "sweetalert2";

import PurchaseTable from "./purchase-table";

import RegisterPurchase from "./register-purchase";
=======
import { Formik, Form, ErrorMessage } from "formik";
import Swal from "sweetalert2";
>>>>>>> purchase form

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
<<<<<<< HEAD

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

          <h2>History</h2>
          <PurchaseTable />

          <RegisterPurchase open={open} handleClose={handleClose} />
=======

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Purchase"} />
      <Sidebar currentPage={4} />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div>
          <div>
            <Formik
              initialValues={{ product: "", productsQtt: 1, price: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.product) {
                  errors.product = "Required";
                }
                if (!values.productsQtt) {
                  errors.productsQtt = "Required";
                }
                if (!values.price) {
                  errors.price = "Required";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                // setTimeout(() => {
                //   alert(JSON.stringify(values, null, 2));
                //   setSubmitting(false);
                // }, 400);
                setSubmitting(false);
                Swal.fire({
                  icon: "success",
                  title: "Purchase Registered!",
                  text: "Everything worked fine!",
                });
              }}
            >
              {({
                isSubmitting,
                touched,
                errors,
                values,
                handleChange,
                handleBlur,
              }) => (
                <Form className="form">
                  <div>
                    <p className="label">Product's Name</p>
                    <input
                      type="text"
                      name="product"
                      value={values.product}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="product"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div>
                    <p className="label">Quantity of Products</p>
                    <input
                      type="number"
                      min="1"
                      name="productsQtt"
                      value={values.productsQtt}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="productsQtt"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div>
                    <p className="label">Unit Price</p>
                    <input
                      type="currency"
                      min="1"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div>
                    <p className="label">Purchase Date</p>
                    <input
                      type="date"
                      name="purchase_date"
                      value={values.date}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="form__button"
                    style={{ marginTop: "1rem" }}
                  >
                    Register Purchase
                  </button>
                </Form>
              )}
            </Formik>
          </div>
>>>>>>> purchase form
        </div>
      </main>
    </div>
  );
}
