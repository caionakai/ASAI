import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

export default function RegisterSupplier({
  open,
  handleClose,
  handleChange,
  supplierInputs,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const postRequest = async (supplierData) => {
    await axios
      .post("http://localhost:8000/erp/supplier/", supplierData)
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        alert("SUPPLIER CREATED");
        handleClose();
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error.response.status);
        if (error.response.status == 504) {
          postRequest(supplierData);
        }
      });
  };

  const createSupplier = async (e) => {
    e.preventDefault();
    const supplierData = {
      address: supplierInputs.address,
      name: supplierInputs.name,
      email: supplierInputs.email,
    };

    setIsLoading(true);
    postRequest(supplierData);
  };

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
          {isLoading ? <CircularProgress /> : null}
          <form>
            <h2 style={{ marginLeft: "2rem" }}>Register Supplier</h2>
            <hr />
            <div>
              <TextField
                id="standard-error"
                label="Supplier's Name"
                name="name"
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
                onChange={handleChange}
                value={supplierInputs.name}
              />
            </div>
            <div>
              <TextField
                id="standard-error-helper-text"
                label="Supplier's Address"
                name="address"
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
                onChange={handleChange}
                value={supplierInputs.address}
              />
            </div>
            <div>
              <TextField
                id="standard-error-helper-text"
                label="Supplier's Email"
                type="email"
                name="email"
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
                onChange={handleChange}
                value={supplierInputs.email}
              />
            </div>
            <hr style={{ marginTop: "2rem" }} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "0.1rem", marginLeft: "70%" }}
              onClick={createSupplier}
              disabled={isLoading}
            >
              Confirm
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
