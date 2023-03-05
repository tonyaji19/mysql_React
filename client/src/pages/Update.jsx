import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [user, setUser] = useState({
    namalengkap: "",
    username: "",
    password: "",
    status: "",
  });

  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/users/${bookId}`, user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>

      <input
        className="rounded-sm"
        type="text"
        placeholder="nama lengkap"
        name="namalengkap"
        onChange={handleChange}
      />
      <textarea
        className="border border-gray-500 rounded-sm"
        rows={5}
        type="text"
        placeholder="username"
        name="username"
        onChange={handleChange}
      />
      <input
        className="rounded-sm"
        type="password"
        placeholder="password"
        name="password"
        onChange={handleChange}
      />
      <input
        className="rounded-sm"
        type="text"
        placeholder="status"
        name="status"
        onChange={handleChange}
      />
      <button className="rounded-sm" onClick={handleClick}>
        Update
      </button>
      {error && "Something went wrong!"}
      <Link to="/">See all Users</Link>
    </div>
  );
};

export default Update;
