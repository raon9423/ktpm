const { users, roles, user_roles } = require("../models");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const config = require("../config/config");

// 📝 Middleware validate input
const validateRegister = [
  body("username").notEmpty().isLength({ min: 3 }).withMessage("Username phải có ít nhất 3 ký tự"),
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password").isLength({ min: 6 }).withMessage("Mật khẩu ít nhất 6 ký tự"),
];

// ✅ API Đăng ký (Register)
const register = [
  validateRegister,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password, full_name, phone_number, address, role_id } = req.body;

      // Kiểm tra username hoặc email đã tồn tại
      if (await users.findOne({ where: { [Op.or]: [{ username }, { email }] } })) {
        return res.status(400).json({ message: "Username hoặc Email đã tồn tại" });
      }

      // Hash mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo user mới
      const newUser = await users.create({
        username, email, password_hash: hashedPassword, full_name, phone_number, address
      });

      // Gán role (mặc định là User nếu không có role_id)
      const assignedRole = await roles.findByPk(role_id || 2);
      if (assignedRole) {
        await user_roles.create({ user_id: newUser.id, role_id: assignedRole.id });
      }

      res.status(201).json({ message: "Đăng ký thành công", userId: newUser.id });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
];

// ✅ API Đăng nhập (Login)
const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Kiểm tra user tồn tại
    const user = await users.findOne({
      where: { [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }] },
      include: { model: roles, as: "roles", through: { attributes: [] } },
    });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user.id, role: user.roles.map(r => r.role_name) }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    });

    res.json({ message: "Đăng nhập thành công", token, user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// ✅ API Đổi mật khẩu (Change Password)
const changePassword = async (req, res) => {
  try {
    const { usernameOrEmail, oldPassword, newPassword } = req.body;

    // Kiểm tra user tồn tại
    const user = await users.findOne({
      where: { [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }
    });

    if (!user || !(await bcrypt.compare(oldPassword, user.password_hash))) {
      return res.status(401).json({ message: "Sai mật khẩu cũ" });
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password_hash: hashedPassword });

    res.json({ message: "Mật khẩu đã được thay đổi thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = { register, login, changePassword };
