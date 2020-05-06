import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import CardMedia from "@material-ui/core/CardMedia";
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
=======
>>>>>>> Commit b4 Merge.
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// comp. usado para diferentes tópicos: brand, sales, etc.

const TopicCard = ({
  perspective,
  changePerspectiveFunction,
  generateChart,
  chart,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      marginBottom: theme.spacing(1),
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: "80%",
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    buttonPeriod: {
      marginLeft: theme.spacing(1),
    },
    changePerspButton: {
      marginLeft: theme.spacing(1),
      float: "right",
    },
  }));
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {perspective}
            <Button
              variant="outlined"
              color="secondary"
              className={classes.changePerspButton}
              onClick={() => changePerspectiveFunction()}
            >
              Change Perspective
            </Button>
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Perspective
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Typography variant="subtitle1" color="textSecondary">
            Period: Last
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttonPeriod}
            onClick={() => generateChart("week")}
          >
            Week
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttonPeriod}
            onClick={() => generateChart("month")}
          >
            Month
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttonPeriod}
            onClick={() => generateChart("year")}
          >
            Year
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttonPeriod}
            onClick={() => generateChart("all time")}
          >
            All Time
          </Button>
        </div>
      </div>
      <div // put generated graphic here
      // pro Brands pode ser um grafico de barra msm
      id="graphToPrint"
      className={classes.cover}
      // image="/static/images/cards/live-from-space.jpg"
      // title="Live from space album cover"
      >
      {chart}
      </div>
    </Card>
  );
};

export default TopicCard;
