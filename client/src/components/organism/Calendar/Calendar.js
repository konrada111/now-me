import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '50px',
    width: '100px',
    height: '100px',
    backgroundColor: 'pink',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'red',
    }
  },
  emptyPaper: {
    marginTop: '50px',
    width: '100px',
    height: '100px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Button(day) {
  const classes = useStyles();
  return(
    <Paper className={classes.paper}>{day}</Paper>
  );
}

function EmptyButton(day) {
    const classes = useStyles();
    return(
      <Paper className={classes.emptyPaper}></Paper>
    );
  }

export default function Calendar(props) {
  const classes = useStyles();

  const names = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  let date = new Date(props.date)
  let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 0)
  let temp = firstDayOfMonth.getDay()===0 ? 6 : firstDayOfMonth.getDay()-1

  const weekdaysBeforeFirst = new Array(temp).fill(0)

  const allMonthDays = Array.from({length: new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()}, (_, i) => i + 1);

  console.log(allMonthDays)

  let daysArray = weekdaysBeforeFirst.concat(allMonthDays)

  function fillDays(daysLoop) {
    while(daysLoop.length%7!==0) {
        daysLoop.push(0)
    }
  }

  fillDays(daysArray)

  function chunkArray(myArray, chunk_size) {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
        tempArray.push(myArray.slice(index, index+chunk_size));
    }
    return tempArray;
  }

  let result = chunkArray(daysArray, 7);

  console.log(result)

  return (
    <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    >
      <Grid container item xs={12} spacing={3}>
      {names.map((day)=>(
        <Paper className={classes.paper}>{day}</Paper>
      ))}
      </Grid>

      {result.map((row)=>(
          <Grid container item xs={12} spacing={3}>
              {row.map((day)=>(
                  day===0 ? 
                  <Paper className={classes.emptyPaper}></Paper>
                  : <Paper className={classes.paper}>{day}</Paper>
              ))}
          </Grid>
      ))}

    </Grid>
  );
}