import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

export default function RegisterSalesdata({
  open,
  handleClose,
  handleChange,
  SalesdataInputs,
  SalesdataId,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const postRequest = async (SalesdataData) => {
    // if there's a id then it's a update request
    if (SalesdataId) {
      await axios
        .put(`http://localhost:8000/crm/Salesdata/${SalesdataId}`, SalesdataData)
        .then(function (response) {
          console.log(response);
          setIsLoading(false);
          alert("Salesdata UPDATED");
          handleClose();
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error.response.status);
          if (error.response.status == 504) {
            postRequest(SalesdataData);
          }
        });
    } else {
      await axios
        .post("http://localhost:8000/crm/Salesdata/", SalesdataData)
        .then(function (response) {
          console.log(response);
          setIsLoading(false);
          alert("Salesdata CREATED");
          handleClose();
          window.location.reload();
        })
        .catch(function (error) {
          
          if(error.response){ if (error.response.status == 504) {
            postRequest(SalesdataData);
          }

        }
         
        });
    }
  };

  const createSalesdata = async (e) => {
    e.preventDefault();
    const SalesdataData = {
      address: SalesdataInputs.address,
      name: SalesdataInputs.name,
      email: SalesdataInputs.email,
    };

    setIsLoading(true);
    postRequest(SalesdataData);
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
            height: "64vh",
            backgroundColor: "white",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "0.5rem",
          }}
        >
        
            <form>
            <h2 style={{ marginLeft: "2rem", color: "bold" }}>Register Salesdata</h2>
            <hr />
            <div>
              <TextField
                id="standard-error"
                label="Salesdata details"
                name="details"
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
                onChange={handleChange}
                value={SalesdataInputs.details}
              />
            </div>
            <div>
              <TextField
                id="standard-error-helper-text"
                label="ID of sale"
                name="idSale"
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
                onChange={handleChange}
                value={SalesdataInputs.idSale}
              />
             </div>
            <hr style={{ marginTop: "2rem" }} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "0.1rem", marginLeft: "70%" }}
              onClick={createSalesdata}
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
