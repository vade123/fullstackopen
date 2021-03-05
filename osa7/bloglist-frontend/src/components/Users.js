import React, { useEffect, useState } from 'react';

import userService from '../services/users';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await userService.getUsers();
      setUsers(result);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr><td>&nbsp;</td><td><b>blogs created</b></td></tr>
          {users.map(user => <tr key={user.name + Date.now()}><td>{user.name}</td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default Users;