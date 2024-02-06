import React, { useState, useEffect } from 'react';
import UserService from 'pages/authentication/api/UserService';
import './Orderstables.css';
const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.getallusers(page, limit, search);
        setUsers(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [page, limit, search]);
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1); 
  };

  return (
    <div className="users-table-container">
      <div className="users-table-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="users-table">
          <thead>
            <tr>
            <th>firstName</th>
            <th>lastName</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.roles}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="users-table-pagination">
        <button className="btn-previous" onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span className="pagination-info">Page: {page} / {totalPages}</span>
        <button className="btn-next" onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
        <select className="limit-select" value={limit} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default UsersTable;
