const config = require("../config/auth.config");
const db = require("../models/");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Register a new user
exports.signup = async (req, res) => {
  try {
    const { userName, address, password, roles } = req.body;

    if (!userName || !address || !password) {
      return res.status(400).send({ message: "Please provide all required fields!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    
    // ตั้งค่า role เป็นค่าเริ่มต้นถ้าไม่มีการส่งมาจาก client
    const userRole = roles && roles.length > 0 ? roles : ["user"];

    const newUser = {
      userName,
      address,
      password: hashedPassword,
      role: userRole[0] // หรือตั้งค่าเป็นค่าเริ่มต้น
    };

    const user = await User.create(newUser);
    
    // ... rest of your code for setting roles

    res.send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong while registering the user." });
  }
};



// Sign in
exports.signin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check for required fields
    if (!userName || !password) {
      return res.status(400).send({ message: "Please provide all required fields!" });
    }

    // Find user by userName
    const user = await User.findOne({ where: { userName } });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Validate password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });

    // Get user roles
    const roles = await user.getRoles();
    const authorities = roles.map(role => "ROLES_" + role.name.toUpperCase());

    res.status(200).send({
      id: user.id,
      userName: user.userName,
      address: user.address,
      roles: authorities,
      accessToken: token,
    });

  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong while signing in." });
  }
};

