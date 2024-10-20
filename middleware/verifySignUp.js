const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");

checkDuplicateUsernameOraddress = async (req, res, next) => {
  try {
    // Check username
    const user = await User.findOne({
      where: {
        userName: req.body.userName, // ตรวจสอบ userName แทน username
      },
    });
    
    if (user) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    // Check email
    const address = await User.findOne({
      where: {
        address: req.body.address,
      },
    });

    if (address) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


// Check roles are valid
checkRolesExisted = async (req, res, next) => {
  const roles = req.body.roles || []; // กำหนดค่าเป็นอาร์เรย์ว่างถ้าไม่มี roles

  console.log("Roles from request body:", roles); // เพิ่มการล็อกเพื่อดูค่าที่ได้รับ

  if (Array.isArray(roles) && roles.length > 0) {
    try {
      const foundRoles = await Role.findAll({
        where: {
          name: { [Op.or]: roles },
        },
      });

      if (foundRoles.length !== roles.length) {
        return res.status(400).send({ message: "Failed! Role does not exist!" });
      }

      next();
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    // จัดการกรณีที่ roles ไม่ใช่อาร์เรย์หรือว่างเปล่า
    return res.status(400).send({ message: "Failed! Roles must be a non-empty array!" });
  }
};



const verifySignUp = {
  checkDuplicateUsernameOraddress,
  checkRolesExisted,
};

module.exports = verifySignUp;
