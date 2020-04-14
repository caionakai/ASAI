import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import SideB from '../SideB';
import TopB from '../TopB';
import CustomTable from './customTable'

import { Grid, Paper, Divider, Input, Box, Button  } from '@material-ui/core'
import { FormLabel } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  paperCard: {
    backgroundColor: '#f5f5f5'
  },
  paperHeader: {
      backgroundColor: '#353535'
  },
  paperHeaderText: {
      color: '#ffffff'
  },
  buttonForm: {
    background: '#1D1D1D',
    borderRadius: '8px',
    color: '#ffffff'
  }
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  const userColsFake = [
    { id: 'identifier', label: 'ID', minWidth: '10%' },
    { id: 'name', label: 'Name', minWidth: '250px' },
    { id: 'select', label: '-', minWidth: '20%' },
  ];

  const userRowsFake = [
    { identifier: 1, name: 'Lucas Mendes', select: 5 },
    { identifier: 2, name: 'Joao Paulo', select: 12 },
    { identifier: 3, name: 'Vinicius Lopes', select: 32 },
    { identifier: 4, name: 'Leonardo Guth', select: 4 },
    { identifier: 5, name: 'Alvaro Oliveira', select: 5 }
  ]

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopB pageTitle={'SALES'} pageRoute={1} />
      <SideB currentPage={3} />
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper elevation={2} className={classes.paperCard}>
                        <div className={classes.paperHeader}>
                            <Box p={1}>
                                <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Client Selection</Typography>
                            </Box>
                        </div>
                        <Divider variant={"middle"} />
                        <Box p={1}>
                        <Grid container justify="center" alignItems="center" direction="row">
                            <Typography variant={'h6'}> Name / NIF: </Typography>
                            <Box ml={4} />
                            <form className={classes.root} noValidate autoComplete="off">
                                <Input placeholder="Example" />
                                <Box ml={4} />
                                <Button className={classes.buttonForm}>Search</Button>
                            </form>
                            <Box p={2} mt={2}>
                                <CustomTable fakeRows={userRowsFake} fakeCols={userColsFake} />
                            </Box>
                        </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper elevation={2} className={classes.paperCard}>
                        <div className={classes.paperHeader}>
                            <Box p={1}>
                                <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Product Selection</Typography>
                            </Box>
                        </div>
                        <Divider variant={"middle"} />
                        <Box p={1}>
                        <Grid container justify="center" alignItems="center" direction="row">
                            <Typography variant={'h6'} className={classes.paperHeaderText} >Name / NIF: </Typography>
                            <Box ml={4} />
                            <form className={classes.root} noValidate autoComplete="off">
                                <Input placeholder="Example" />
                                <Box ml={4} />
                                <input size="small" type="submit" value="Search"  />
                            </form>
                        </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper elevation={2} className={classes.paperCard}>
                    <div className={classes.paperHeader}>
                        <Box p={1}>
                            <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Shopping Cart</Typography>
                        </Box>
                    </div>
                    <Divider variant={"middle"} />
                    <Box p={5}>

                    </Box>
                    </Paper>
                </Grid>
            </Grid>
        </main>
      </div>
  );
}