import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tonyaji19",
  database: "crud",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM tbl_user";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const q =
    "INSERT INTO tbl_user(`namalengkap`, `username`, `password`, `status`) VALUES (?)";

  const values = [
    req.body.namalengkap,
    req.body.username,
    req.body.password,
    req.body.status,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/users/:id", (req, res) => {
  const idUser = req.params.id;
  const q = " DELETE FROM tbl_user WHERE userid = ? ";

  db.query(q, [idUser], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/users/:id", (req, res) => {
  const idUser = req.params.id;
  const q =
    "UPDATE tbl_user SET `namalengkap`= ?, `username`= ?, `password`= ?, `status`= ? WHERE userid = ?";

  const values = [
    req.body.namalengkap,
    req.body.username,
    req.body.password,
    req.body.status,
  ];

  db.query(q, [...values, idUser], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
