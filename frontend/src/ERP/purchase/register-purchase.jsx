import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

export default function RegisterPurchase({ open, handleClose }) {
  console.log("open:", open);
  return (
    <div>
      <Modal
        disableEnforceFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ boxShadow: "none", border: "none" }}
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
            borderRadius: "0.5rem",
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
            <hr style={{ marginTop: "2rem" }} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              // disabled={isSubmitting}
              className="form__button"
              style={{ marginTop: "0.1rem", marginLeft: "70%" }}
            >
              Confirm
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
