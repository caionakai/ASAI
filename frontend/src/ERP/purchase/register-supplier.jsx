import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

export default function RegisterSupplier({ open, handleClose }) {
  console.log("open:", open);
  return (
    <div>
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
            height: "47vh",
            backgroundColor: "white",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "0.5rem",
          }}
        >
          <form>
            <h2 style={{ marginLeft: "2rem" }}>Register Supplier</h2>
            <hr />
            <div>
              <TextField
                id="standard-error"
                label="Supplier's Name"
                defaultValue=""
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
              />
            </div>
            <div>
              <TextField
                id="standard-error-helper-text"
                label="Supplier's Address"
                defaultValue=""
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
              />
            </div>
            <div>
              <TextField
                id="standard-error-helper-text"
                label="Supplier's Email"
                type="email"
                defaultValue=""
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
              />
            </div>
            <hr style={{ marginTop: "2rem" }} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
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
