const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const storeRouter = require("./routers/store.router");
const authRouter = require("./routers/auth.router");
const db = require("./models/");
const role = db.Role;
const cors = require("cors");

const corsOption = {
  origin: "http://localhost:5173", // เปลี่ยน URL ตามที่เหมาะสม
};

// Dev mode: ใช้สำหรับทดสอบเท่านั้น
db.sequelize.sync({ force: true }).then(() => {
  initRole();
  console.log("Drop and Sync DB");
});

const initRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};

// ใช้ middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ใช้ router
app.use("/api/v1/devices/", storeRouter); // เปลี่ยน URL ให้ตรงกับการจัดการรายวิชา
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Course Management API</h1>"); // เปลี่ยนข้อความให้ตรงกับระบบ
});

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
