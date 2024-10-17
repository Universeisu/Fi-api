const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifySignUp = require("../middleware/verifySignUp")


router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Route สำหรับการสมัครสมาชิก
router.post("/signup", 
  [
  verifySignUp.checkDuplicateUsernameOrEmail, 
  verifySignUp.checkRolesExisted, 
  ],
  authController.signup
);

// Route สำหรับการเข้าสู่ระบบ (ถ้ามี)
router.post("/signin", authController.signin);

module.exports = router;
