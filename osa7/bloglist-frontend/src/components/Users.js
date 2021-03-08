import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
  const users = useSelector(state => state.users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr><td>&nbsp;</td><td><b>blogs created</b></td></tr>
          {users.map(user =>
            <tr key={user.name + Date.now()}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default Users;