import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, idclient, idfunc, paymentMethod, amount) {
  return { id, date, idclient, idfunc, paymentMethod, amount };
}

const rows = [
  createData(0, '20 Maio 2020', 'Elvis Maluco', 'João', 'VISA ⠀•••• 6719', 31),
  createData(0, '19 Maio 2020', 'Elvis Apenas', 'João', 'VISA ⠀•••• 3769', 313.44),
  createData(0, '10 Maio 2020', 'Ricardo Nonsei', 'Rita', 'VISA ⠀•••• 3519', 352.43),
  createData(0, '01 Maio 2020', 'Ronaldo', 'João', 'VISA ⠀•••• 3459', 31343),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
       <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>CLient</TableCell>
            <TableCell>Func</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.idclient}</TableCell>
              <TableCell>{row.idfunc}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="black" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}