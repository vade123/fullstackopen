import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const Users = () => {
  const users = useSelector(state => state.users);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  return (
    <div>
      <Typography variant="h5">Users</Typography>
      <TableContainer component={Card} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <StyledTableRow key={user.name + Date.now()}>
                <TableCell><Link
                  to={`/users/${user.id}`}>
                  <Typography>{user.name}</Typography>
                </Link></TableCell>
                <TableCell><Typography>{user.blogs.length}</Typography></TableCell>
              </StyledTableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;