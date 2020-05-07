import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import DeleteIcon from "@material-ui/icons/Delete";

const PurchaseTable = (props) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const rows = [
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
    {
      name: "Red Dress",
      price: "100£",
      quantity: 10,
      supplierName: "Mori",
      total: "1000£",
    },
  ];

  return (
    <div>
      <Paper>
        <TableContainer>
          <Table aria-label="enhanced table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Supplier Name</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.supplierName}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default PurchaseTable;
