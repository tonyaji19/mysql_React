import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [user, setUser] = useState({
    namalengkap: "",
    username: "",
    password: "",
    status: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/users", user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1 className="font-bold text-2xl text-teal-700">Add New User</h1>
      <input
        className="rounded-sm"
        type="text"
        placeholder="Nama Lengkap"
        name="namalengkap"
        onChange={handleChange}
      />
      <textarea
        className="border border-gray-500 rounded-sm"
        rows={5}
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleChange}
      />
      <input
        className="rounded-sm"
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <input
        className="rounded-sm"
        type="text"
        placeholder="Status"
        name="status"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Users</Link>
    </div>
  );
};

export default Add;
