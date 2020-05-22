import React, { useState, useEffect } from "react";
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
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const PurchaseTable = ({ props, setPurchaseInputs }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [supplierData, setSupplierData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getRequest = async () => {
    await axios
      .get("http://localhost:8000/erp/purchaseRequest/")
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

  const deleteRequest = async (purchaseId) => {
    await axios
      .delete(`http://localhost:8000/erp/purchaseRequest/${purchaseId}`)
      .then(function (response) {
        // setIsLoading(false);
        alert("PURCHASE DELETED");
        getRequest();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status == 504) {
            deleteRequest(purchaseId);
          }
        }
      });
  };

  useEffect(() => {
    getRequest();
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
                  <TableCell>Product's Id</TableCell>
                  <TableCell align="right">Supplier's Id</TableCell>
                  <TableCell align="right">Quantity</TableCell>
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
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.product_id}
                    </TableCell>
                    <TableCell align="right">{row.supplier_id}</TableCell>
                    <TableCell align="right">{row.items_count}</TableCell>
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
                          // setSupplierInputs({
                          //   address: row.address,
                          //   name: row.name,
                          //   email: row.email,
                          // });
                          // setSupplierId(row.id);
                          // toggleModalSupplier();
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

export default PurchaseTable;
