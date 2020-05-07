import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useEffect } from "react";
import axios from "axios";
import "./supplier.styles.css";

import CircularProgress from "@material-ui/core/CircularProgress";

const SupplierTable = ({ setSupplierInputs, toggleModalSupplier }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [supplierData, setSupplierData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRequest = async () => {
    await axios
      .get("http://localhost:8000/erp/supplier/")
      .then(function (response) {
        setSupplierData(response.data.res);
        setIsLoading(false);
      })
      .catch(function (error) {
        if (error.response.status == 504) {
          setIsLoading(true);
          getRequest();
        }
      });
  };

  const deleteRequest = async (supplierId) => {
    await axios
      .delete(`http://localhost:8000/erp/supplier/${supplierId}`)
      .then(function (response) {
        // setIsLoading(false);
        alert("SUPPLIER DELETED");
        getRequest();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status == 504) {
            deleteRequest(supplierId);
          }
        }
      });
  };

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Paper>
          <TableContainer>
            <Table aria-label="enhanced table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Supplier's Name</TableCell>
                  <TableCell align="right">Supplier's Adress</TableCell>
                  <TableCell align="right">Supplier's Email</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? supplierData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : supplierData
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>

                    <TableCell align="right">
                      <DeleteIcon
                        className="supplier___table--icon"
                        onClick={() => {
                          deleteRequest(row.id);
                        }}
                      />
                      <EditIcon
                        className="supplier___table--icon"
                        onClick={() => {
                          setSupplierInputs({
                            address: row.address,
                            name: row.name,
                            email: row.email,
                          });
                          toggleModalSupplier();
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={supplierData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
};

export default SupplierTable;
