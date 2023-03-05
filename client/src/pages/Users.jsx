import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(user);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/users/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="font-bold">Users Personal</h1>
      <div>
        {user.map((usr) => (
          <div
            key={usr.userid}
            className="w-[100%] text-gray-700 bg-gray-300 p-3 grid grid-cols-2 font-quicksand mb-4 font-semibold"
          >
            <p className="p-1">
              User :{" "}
              <span className="italic font-normal">{usr.namalengkap}</span>
            </p>
            <p className="p-1">
              Username :{" "}
              <span className="italic font-normal">{usr.username}</span>
            </p>
            <p className="p-1">
              Password :{" "}
              <span className="italic font-normal">{usr.password}</span>
            </p>
            <p className="p-1">
              Status : <span className="italic font-normal">{usr.status}</span>
            </p>
            <button
              className="text-red-500"
              onClick={() => handleDelete(usr.userid)}
            >
              Delete
            </button>
            <button className="text-sky-600 ">
              <Link
                to={`/update/${usr.userid}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add New User
        </Link>
      </button>
    </div>
  );
};

export default Users;
