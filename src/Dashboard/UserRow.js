import React from 'react';

const UserRow = ({ user, index, refetch }) => {
    const { email, role } = user;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button class="btn btn-xs btn-success">Make Admin</button>}</td>
            <td><button class="btn btn-xs btn-warning">Remove User</button></td>
        </tr>
    );
};

export default UserRow;