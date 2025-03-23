// const multer = require('multer');
// const path = require('path');

// // Cấu hình multer để lưu trữ file
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/students/'); // Thư mục lưu ảnh, tạo thư mục này nếu chưa có
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
//   }
// });

// // Bộ lọc file (chỉ cho phép hình ảnh)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only JPEG, PNG, and GIF images are allowed'), false);
//   }
// };

// // Khởi tạo multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
//   fileFilter: fileFilter
// });

// module.exports = upload;

const multer = require('multer');
const path = require('path');

// Hàm cấu hình storage với thư mục động
const configureStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folder}/`);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });
};

// Bộ lọc file
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and GIF images are allowed'), false);
  }
};

// Hàm khởi tạo multer với folder tùy chỉnh
const upload = (folder) => {
  return multer({
    storage: configureStorage(folder),
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
    fileFilter: fileFilter,
  });
};

module.exports = upload; // Export hàm upload