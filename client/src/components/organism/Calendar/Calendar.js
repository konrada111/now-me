import React, { useContext, useEffect, useImperativeHandle, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useParams } from 'react-router-dom';
import ModalView from '../ModalView/ModalView';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '50px',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgb(244,82,103)',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgb(237,59,71)',
    },
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
  weekdayPaper: {
    marginTop: '50px',
    width: '100px',
    height: '50px',
    color: 'rgb(244,82,103)',
    margin: 'auto',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  navbar: {
    backgroundColor: 'rgb(244,82,103)',
  },
  button: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgb(237,59,71)',
    },
  },
  month_year: {
    textAlign: 'center',
  },
}));

function FilledButton(day) {
  const classes = useStyles();
  return <Paper className={classes.paper}>{day}</Paper>;
}

function EmptyButton(day) {
  const classes = useStyles();
  return <Paper className={classes.emptyPaper}></Paper>;
}

export default function Calendar(props) {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = useState(false);

  const names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [date, setDate] = useState(new Date(props.date));
  const [result, setResult] = useState([]);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setDay(date.getDate());
    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    let temp = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

    const weekdaysBeforeFirst = new Array(temp).fill(0);

    const allMonthDays = Array.from({ length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }, (_, i) => i + 1);

    let daysArray = weekdaysBeforeFirst.concat(allMonthDays);

    while (daysArray.length % 7 !== 0) {
      daysArray.push(0);
    }

    let index = 0;
    let arrayLength = daysArray.length;
    let tempArray = [];
    for (index = 0; index < arrayLength; index += 7) {
      tempArray.push(daysArray.slice(index, index + 7));
    }

    setResult(tempArray);
  }, [date]);

  function handleOnSubmitLeft(e) {
    let day = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(day);
  }

  function handleOnSubmitRight(e) {
    let day = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(day);
  }
  const handleDayClick = (day) => {
    setIsOpen(true);
    setDay(day);
  };
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid container direction="row" justify="space-between" alignItems="center" className={classes.navbar}>
          <Button variant="contained" onClick={handleOnSubmitLeft} className={classes.button}>
            <ArrowBackIcon />
          </Button>
          <div>
            <Typography variant="h4" className={classes.month_year}>
              {months[month]}
            </Typography>
            <Typography variant="h5" className={classes.month_year}>
              {year}
            </Typography>
          </div>
          <Button variant="contained" onClick={handleOnSubmitRight} className={classes.button}>
            <ArrowForwardIcon />
          </Button>
        </Grid>

        <Grid container item xs={12} spacing={3}>
          {names.map((day) => (
            <div className={classes.weekdayPaper}>{day}</div>
          ))}
        </Grid>

        {result.map((row) => (
          <Grid container item xs={12} spacing={3}>
            {row.map((day) =>
              day === 0 ? (
                <Paper className={classes.emptyPaper}></Paper>
              ) : (
                <Paper className={classes.paper} onClick={() => handleDayClick(day)}>
                  {day}
                </Paper>
              )
            )}
          </Grid>
        ))}
      </Grid>
      {modalIsOpen ? <ModalView isOpen={modalIsOpen} setIsOpen={setIsOpen} day={day} month={month} year={year} /> : null}
    </>
  );
}
