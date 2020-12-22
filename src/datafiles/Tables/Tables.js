import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, project, units, First, last) {
  return { name, project, units, First, last };
}

const rows = [
  createData('122', 159, 6.0, 24, 4.0),
  createData('23', 237, 9.0, 37, 4.3),
  createData('454', 262, 16.0, 24, 6.0),
  createData('2', 305, 3.7, 67, 4.3),
  createData('1', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 1500,
    
  },
});

export default function Tables() {
  const classes = useStyles();

  return (
    <>
    <h2>Data Table</h2>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Project</StyledTableCell>
            <StyledTableCell align="right">Unit</StyledTableCell>
            <StyledTableCell align="right">First</StyledTableCell>
            <StyledTableCell align="right">Last</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.project}</StyledTableCell>
              <StyledTableCell align="right">{row.units}</StyledTableCell>
              <StyledTableCell align="right">{row.First}</StyledTableCell>
              <StyledTableCell align="right">{row.last}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
