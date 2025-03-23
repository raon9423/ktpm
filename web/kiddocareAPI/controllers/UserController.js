const { users, roles, user_roles } = require("../models");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize"); // ✅ Import Op

// Validation middleware cho createUser và updateUser
const validateUser = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("full_name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters long"),
  body("phone_number")
    .optional()
    .isMobilePhone()
    .withMessage("Phone number must be valid"),
  body("address")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Address must not exceed 255 characters"),
];

const getUsers = async (req, res) => {
  try {
    const usersWithRoles = await users.findAll({
      include: {
        model: roles,
        as: "roles",
        through: { attributes: [] },
      },
    });
    res.json(usersWithRoles);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Lấy user theo ID
const getUserById = async (req, res) => {
  try {
    const user = await users.findOne({
      where: { id: req.params.id },
      include: { model: roles, as: "roles", through: { attributes: [] } },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Thêm mới user + role mặc định
const createUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      username,
      email,
      password,
      full_name,
      phone_number,
      address,
      role_id,
    } = req.body;

    try {
      if (await users.findOne({ where: { username } })) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (await users.findOne({ where: { email } })) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const password_hash = await bcrypt.hash(password, 10);
      const newUser = await users.create({
        username,
        email,
        password_hash,
        full_name,
        phone_number,
        address,
      });

      // ✅ Thêm user vào role mặc định hoặc role từ request
      let assignedRole = await roles.findByPk(role_id || 2); // Role 2 = default user
      if (assignedRole) {
        await user_roles.create({
          user_id: newUser.id,
          role_id: assignedRole.id,
        });
      }

      const userWithRoles = await users.findOne({
        where: { id: newUser.id },
        include: { model: roles, as: "roles", through: { attributes: [] } },
      });

      res.status(201).json(userWithRoles);
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

// Cập nhật user + roles
const updateUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;
    const {
      username,
      email,
      password,
      full_name,
      phone_number,
      address,
      role_id,
    } = req.body;

    try {
      const user = await users.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (
        await users.findOne({ where: { username, id: { [Op.ne]: userId } } })
      ) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (await users.findOne({ where: { email, id: { [Op.ne]: userId } } })) {
        return res.status(400).json({ message: "Email already exists" });
      }

      let password_hash = user.password_hash;
      if (password) password_hash = await bcrypt.hash(password, 10);

      await user.update({
        username,
        email,
        password_hash,
        full_name,
        phone_number,
        address,
      });

      // ✅ Cập nhật roles nếu có role_id mới
      if (role_id) {
        await user_roles.destroy({ where: { user_id: user.id } });
        await user_roles.create({ user_id: user.id, role_id });
      }

      await user.reload({
        include: { model: roles, as: "roles", through: { attributes: [] } },
      });

      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

// Xóa user
const deleteUser = async (req, res) => {
  try {
    const user = await users.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user_roles.destroy({ where: { user_id: user.id } }); // ✅ Xóa roles trước
    await user.destroy();

    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const searchTeachers = async (req, res) => {
  try {
    const { name, phone } = req.query;

    // Điều kiện tìm kiếm
    const where = {};
    if (name) {
      where.full_name = { [Op.like]: `%${name}%` };
    }
    if (phone) {
    
      where.phone_number = { [Op.like]: `%${phone}%` };
    }

    const foundTeachers = await users.findAll({
      where,
      include: [
        { model: roles, as: 'roles' }, // Sử dụng biến Roles đã import
      ],
    });

    // Lọc chỉ lấy giáo viên có role "Teacher"
    const filteredTeachers = foundTeachers.filter((teacher) =>
      teacher.roles.some((role) => role.role_name === 'Teacher')
    );

    res.status(200).json(filteredTeachers.length > 0 ? filteredTeachers : []);
  } catch (error) {
    console.error('Error searching teachers:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchTeachers,
};
