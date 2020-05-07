import React, { useRef, useState, useMemo } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";

export default function RegisterPurchase({
  open,
  handleClose,
  handleChange,
  purchaseInputs,
  purchaseId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [supplierSelected, setSupplierSelected] = useState(null);
  const [allSuppliers, setAllSuppliers] = useState([]);

  const getRequest = async () => {
    await axios
      .get("http://localhost:8000/erp/supplier/")
      .then(function (response) {
        setAllSuppliers(response.data.res);
      })
      .catch(function (error) {
        if (error.response.status == 504) {
          getRequest();
        }
      });
  };

  useEffect(() => {
    getRequest();
  }, []);

  const postRequest = async (purchaseData) => {
    // if there's a id then it's a update request
    if (purchaseId) {
      await axios
        .put(`http://localhost:8000/erp/supplier/${purchaseId}`, purchaseData)
        .then(function (response) {
          console.log(response);
          setIsLoading(false);
          alert("PURCHASE UPDATED");
          handleClose();
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error.response.status);
          if (error.response.status == 504) {
            postRequest(purchaseData);
          }
        });
    } else {
      await axios
        .post("http://localhost:8000/erp/supplier/", purchaseData)
        .then(function (response) {
          console.log(response);
          setIsLoading(false);
          alert("PURCHASE CREATED");
          handleClose();
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error.response.status);
          if (error.response.status == 504) {
            postRequest(purchaseData);
          }
        });
    }
  };

  const createPurchase = async (e) => {
    e.preventDefault();
    const purchaseData = {
      address: purchaseInputs.address,
      name: purchaseInputs.name,
      email: purchaseInputs.email,
    };

    setIsLoading(true);
    postRequest(purchaseData);
  };

  const handleSupplierSelectedChange = (event) => {
    setSupplierSelected(event.target.value);
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
            <h2 style={{ marginLeft: "2rem" }}>Register Purchase</h2>
            <hr />
            <div>
              <TextField
                id="standard-error"
                label="Product's Name"
                value={purchaseInputs.name}
                name="name"
                onChange={handleChange}
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
              />
            </div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={supplierSelected}
              onChange={handleSupplierSelectedChange}
              style={{ marginTop: "1rem", marginLeft: "2rem" }}
            >
              {allSuppliers.map((supp) => {
                return <MenuItem value={supp.id}>{supp.name}</MenuItem>;
              })}
            </Select>
            <div>
              <TextField
                id="standard-error-helper-text"
                label="Unit Price"
                type="number"
                value={purchaseInputs.price}
                name="price"
                onChange={handleChange}
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
              />
            </div>
            <div>
              <TextField
                id="standard-error-helper-text"
                label="Quantity of Products"
                type="number"
                value={purchaseInputs.quantity}
                name="quantity"
                onChange={handleChange}
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
              />
            </div>
            <div>
              <TextField
                id="standard-error-helper-text"
                label="Purchase Date"
                type="date"
                value={purchaseInputs.date}
                name="date"
                onChange={handleChange}
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
              style={{ marginTop: "0.1rem", marginLeft: "70%" }}
              onClick={createPurchase}
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
