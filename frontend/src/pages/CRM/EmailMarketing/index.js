import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import SideB from '../../ERP/Sales/SideB';
import TopB from './TopB';


import { Grid, Paper, Divider, Input, Box, Button, Radio, RadioGroup, FormControl, FormControlLabel,
         TextField, TextareaAutosize, FormGroup, Checkbox } from '@material-ui/core'
import { FormLabel } from '@material-ui/core';
import { borders } from '@material-ui/system';
import SendIcon from '@material-ui/icons/Send';
import OtherRadio from "./OtherRadio";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    emailBody: {
        marginTop: theme.spacing(1.5),
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    paperCard: {
        backgroundColor: '#FFFFFF'
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
    },
    button: {
        marginTop: theme.spacing(1),
        backgroundColor: 'black',
        '&:hover': {
            backgroundColor: 'black',
        }
    }
}));


export default function PermanentDrawerLeft() {
    const classes = useStyles();

    const [selectedValue, setSelectedValue] = React.useState('everyone');

    const handleChange = (event) => {
        setSelectedValue({ value: event.target.value });
    };

    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
      });

    const handleChangeCheck = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopB pageTitle={'Email Marketing'} />
            <SideB currentPage={15} />

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={2} className={classes.paperCard}>
                            <Box borderRadius={4} className={classes.paperHeader} p={1}>
                                <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Recipients</Typography>
                            </Box>
                            <Box p={2}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>

                                        <FormControl component="fieldset" fullWidth>
                                            <RadioGroup defaultValue="everyone" aria-label="sendto" name="sendto" onChange={handleChange}>
                                                <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
                                                <FormControlLabel value="employees" control={<Radio />} label="Employees" />
                                                <FormControlLabel value="customers" control={<Radio />} label="Customers" />
                                                <FormControlLabel value="other" control={<Radio />} label={<OtherRadio label="Other" />} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox  onChange={handleChangeCheck} name="gilad" />}
                                                label="Gilad Gray"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox  onChange={handleChangeCheck} name="jason" />}
                                                label="Jason Killian"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox  onChange={handleChangeCheck} name="antoine" />}
                                                label="Antoine Llorca"
                                            />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={2} className={classes.paperCard}>
                            <Box borderRadius={4} className={classes.paperHeader} p={1}>
                                <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>E-mail</Typography>
                            </Box>
                            <Box p={2}>
                                <div>
                                    <TextField
                                        required
                                        fullWidth
                                        id="subject-text"
                                        label="Subject"
                                        variant="filled"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        rows={15}
                                        rowsMax={30}
                                        id="content-text"
                                        label="Content"
                                        variant="outlined"
                                        className={classes.emailBody}
                                    />
                                </div>
                                <div>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                        endIcon={<SendIcon />}
                                    >Send</Button>

                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        </div >
    );
}