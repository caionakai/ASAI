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
import "./marketing.styles.css";

import CircularProgress from "@material-ui/core/CircularProgress";

const MarketingTable = ({
  setMarketingInputs,
  toggleModalMarketing,
  setMarketingId,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [marketingData, setMarketingData] = useState([]);

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
      .get("http://localhost:8000/crm/marketing/")
      .then(function (response) {
        setMarketingData(response.data.marketing);
        setIsLoading(false);
      })
      .catch(function (error) {
        if (error.response?.status == 504) {
          setIsLoading(true);
          getRequest();
        }
      });
  };

  const deleteRequest = async (marketingId) => {
    await axios
      .delete(`http://localhost:8000/crm/marketing/${marketingId}`)
      .then(function (response) {
        // setIsLoading(false);
        alert("marketing DELETED");
        getRequest();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status == 504) {
            deleteRequest(marketingId);
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
                  <TableCell align="right">Marketing's Name</TableCell>
                  <TableCell align="right">Marketing's Adress</TableCell>
                  <TableCell align="right">Marketing's Email</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? marketingData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : marketingData
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.client[0].name}
                    </TableCell>
                    <TableCell align="right">{row.client[0].address}</TableCell>
                    <TableCell align="right">{row.client[0].email}</TableCell>

                    <TableCell align="right">
                      <DeleteIcon
                        className="marketing___table--icon"
                        onClick={() => {
                          deleteRequest(row.id);
                        }}
                      />
                      <EditIcon
                        className="marketing___table--icon"
                        onClick={() => {
                          setMarketingInputs({
                            client: [
                              {
                                address: row.client[0].address,
                                name: row.client[0].name,
                                email: row.client[0].email,
                              },
                            ],
                          });
                          setMarketingId(row.id);
                          toggleModalMarketing();
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
            count={marketingData.length}
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

export default MarketingTable;
