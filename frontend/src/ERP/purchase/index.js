import React from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, ErrorMessage } from "formik";
import Swal from "sweetalert2";

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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Purchase"} />
      <Sidebar currentPage={4} />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div>
          <Button
            variant="contained"
            color="primary"
            className="form__button"
            style={{ marginTop: "1rem" }}
            onClick={handleOpen}
          >
            Register Purchase
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div
              style={{
                position: "absolute",
                width: "30vw",
                height: "55vh",
                backgroundColor: "white",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <form>
                <h2 style={{ marginLeft: "2rem" }}>Register Purchase</h2>
                <hr />
                <div>
                  <TextField
                    id="standard-error"
                    label="Product's Name"
                    defaultValue=""
                    style={{ marginTop: "1rem", marginLeft: "2rem" }}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-error-helper-text"
                    label="Unit Price"
                    type="number"
                    defaultValue=""
                    style={{ marginTop: "1rem", marginLeft: "2rem" }}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-error-helper-text"
                    label="Quantity of Products"
                    type="number"
                    defaultValue=""
                    style={{ marginTop: "1rem", marginLeft: "2rem" }}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-error-helper-text"
                    label="Purchase Date"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ marginTop: "1rem", marginLeft: "2rem" }}
                  />
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  // disabled={isSubmitting}
                  className="form__button"
                  style={{ marginTop: "1rem", marginLeft: "70%" }}
                >
                  Confirm
                </Button>
              </form>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
}
