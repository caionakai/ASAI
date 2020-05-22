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
import "./salesdata.styles.css";

import CircularProgress from "@material-ui/core/CircularProgress";

const SalesdataTable = ({
  setSalesdataInputs,
  toggleModalSalesdata,
  setSalesdataId,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [SalesdataData, setSalesdataData] = useState([]);

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
      .get("http://localhost:8000/crm/Salesdata/")
      .then(function (response) {
        setSalesdataData(response.data.res);
        setIsLoading(false);
      })
      .catch(function (error) {
        if (error.response.status == 504) {
          setIsLoading(true);
          getRequest();
        }
      });
  };

  const deleteRequest = async (SalesdataId) => {
    await axios
      .delete(`http://localhost:8000/crm/Salesdata/${SalesdataId}`)
      .then(function (response) {
        // setIsLoading(false);
        alert("Salesdata DELETED");
        getRequest();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status == 504) {
            deleteRequest(SalesdataId);
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
                  <TableCell align="right">Salesdata's id</TableCell>
                  <TableCell align="right">Salesdata's details</TableCell>
                  <TableCell align="right">Id of Sale</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? SalesdataData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : SalesdataData
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.details}
                    </TableCell>
                   

                    <TableCell align="right">
                      <DeleteIcon
                        className="Salesdata___table--icon"
                        onClick={() => {
                          deleteRequest(row.id);
                        }}
                      />
                      <EditIcon
                        className="Salesdata___table--icon"
                        onClick={() => {
                          setSalesdataInputs({
                            address: row.address
                          });
                          setSalesdataId(row.id);
                          toggleModalSalesdata();
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
            count={SalesdataData.length}
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

export default SalesdataTable;
