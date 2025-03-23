const sequelize = require("../config/sequelize"); // Import Sequelize instance đã tạo
const { DataTypes } = require("sequelize");

// Khai báo object db để chứa models
const db = {};
db.Sequelize = sequelize.Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require("./users")(sequelize, DataTypes);
db.roles = require("./roles")(sequelize, DataTypes);
db.user_roles = require("./user_roles")(sequelize, DataTypes);
// db.teachers = require("./teachers")(sequelize, DataTypes);
// db.parents = require("./parents")(sequelize, DataTypes);f
db.teacher_activities = require("./teacher_activities")(sequelize, DataTypes);
db.class_activities = require("./class_activities")(sequelize, DataTypes);
db.students = require("./students")(sequelize, DataTypes);
db.classes = require("./classes")(sequelize, DataTypes);
db.class_students = require("./class_students")(sequelize, DataTypes);
db.teacher_class = require("./teacher_class")(sequelize, DataTypes);
db.activities = require("./activities")(sequelize, DataTypes);
db.activity_participants = require("./activity_participants")(
  sequelize,
  DataTypes
);
db.extracurricular_activities = require("./extracurricular_activities")(
  sequelize,
  DataTypes
);
db.assessments = require("./assessments")(sequelize, DataTypes);
db.attendance = require("./attendance")(sequelize, DataTypes);
db.schedule = require("./schedule")(sequelize, DataTypes);
db.messages = require("./messages")(sequelize, DataTypes);
db.chat_rooms = require("./chat_rooms")(sequelize, DataTypes);
db.chat_room_users = require("./chat_room_users")(sequelize, DataTypes);
db.message_status = require("./message_status")(sequelize, DataTypes);
db.notifications = require("./notifications")(sequelize, DataTypes);
db.feedback = require("./feedback")(sequelize, DataTypes);
db.payments = require("./payments")(sequelize, DataTypes);
db.health_records = require("./health_records")(sequelize, DataTypes);
db.vaccines = require("./vaccines")(sequelize, DataTypes);
db.student_vaccines = require("./student_vaccines")(sequelize, DataTypes);

// Định nghĩa quan hệ giữa các model
// db.users.belongsToMany(db.roles, {
//   through: "user_roles",
//   as: "roles",
//   foreignKey: "user_id",
// });
// db.roles.belongsToMany(db.users, {
//   through: "user_roles",
//   as: "users",
//   foreignKey: "role_id",
// });
// Định nghĩa quan hệ giữa các model

// User - Role (N-N)
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  as: "roles",
  foreignKey: "user_id",
});
db.roles.belongsToMany(db.users, {
  through: "user_roles",
  as: "users",
  foreignKey: "role_id",
});

// User - Class (N-N)
db.users.belongsToMany(db.classes, {
  through: "teacher_class",
  as: "classes",
  foreignKey: "teacher_id",
});
db.classes.belongsToMany(db.users, {
  through: "teacher_class",
  as: "teachers",
  foreignKey: "class_id",
});

// User - Messages (1-N)
db.users.hasMany(db.messages, { as: "messages", foreignKey: "sender_id" });
db.messages.belongsTo(db.users, { as: "sender", foreignKey: "sender_id" });

// User - Notifications (1-N)
db.users.hasMany(db.notifications, {
  as: "notifications",
  foreignKey: "recipient_id",
});
db.notifications.belongsTo(db.users, {
  as: "recipient",
  foreignKey: "recipient_id",
});

// User - Feedback (1-N)
db.users.hasMany(db.feedback, { as: "feedbacks", foreignKey: "user_id" });
db.feedback.belongsTo(db.users, { as: "user", foreignKey: "user_id" });

// User - Payments (1-N)
db.users.hasMany(db.payments, { as: "payments", foreignKey: "parent_id" });
db.payments.belongsTo(db.users, { as: "parent", foreignKey: "parent_id" });

// User - Schedule (1-N)
db.users.hasMany(db.schedule, { as: "schedules", foreignKey: "teacher_id" });
db.schedule.belongsTo(db.users, { as: "teacher", foreignKey: "teacher_id" });

// User - Chat Room (N-N)
db.users.belongsToMany(db.chat_rooms, {
  through: "chat_room_users",
  as: "chat_rooms",
  foreignKey: "user_id",
});
db.chat_rooms.belongsToMany(db.users, {
  through: "chat_room_users",
  as: "users",
  foreignKey: "chat_room_id",
});

// User - Message Status (1-N)
db.users.hasMany(db.message_status, {
  as: "message_statuses",
  foreignKey: "user_id",
});
db.message_status.belongsTo(db.users, { as: "user", foreignKey: "user_id" });

// User - Teacher Activities (1-N)
db.users.hasMany(db.teacher_activities, {
  as: "teacher_activities",
  foreignKey: "teacher_id",
});
db.teacher_activities.belongsTo(db.users, {
  as: "teacher",
  foreignKey: "teacher_id",
});

// User - Assessments (1-N)
db.users.hasMany(db.assessments, {
  as: "assessments",
  foreignKey: "teacher_id",
});

db.assessments.belongsTo(db.users, {
  as: "teacher",
  foreignKey: "teacher_id",
});

// Student - Class (N-N)
db.students.belongsToMany(db.classes, {
  through: "class_students",
  as: "classes",
  foreignKey: "student_id",
});
db.classes.belongsToMany(db.students, {
  through: "class_students",
  as: "students",
  foreignKey: "class_id",
});

// Student - Parent (1-N)
db.users.hasMany(db.students, { as: "students", foreignKey: "parent_id" });
db.students.belongsTo(db.users, { as: "parent", foreignKey: "parent_id" });

// Student - Attendance (1-N)
db.students.hasMany(db.attendance, {
  as: "attendances",
  foreignKey: "student_id",
});
db.attendance.belongsTo(db.students, {
  as: "student",
  foreignKey: "student_id",
});

// Student - Health Records (1-N)
db.students.hasMany(db.health_records, {
  as: "health_records",
  foreignKey: "student_id",
});
db.health_records.belongsTo(db.students, {
  as: "student",
  foreignKey: "student_id",
});

// Student - Assessments (1-N)
db.students.hasMany(db.assessments, {
  as: "assessments",
  foreignKey: "student_id",
});
db.assessments.belongsTo(db.students, {
  as: "student",
  foreignKey: "student_id",
});

// Student - Extracurricular Activity Participants (N-N)
db.students.belongsToMany(db.extracurricular_activities, {
  through: "activity_participants",
  as: "extracurricular_activities",
  foreignKey: "student_id",
});
db.extracurricular_activities.belongsToMany(db.students, {
  through: "activity_participants",
  as: "students",
  foreignKey: "activity_id",
});

// Student - Vaccines (N-N)
db.students.belongsToMany(db.vaccines, {
  through: "student_vaccines",
  as: "vaccines",
  foreignKey: "student_id",
});
db.vaccines.belongsToMany(db.students, {
  through: "student_vaccines",
  as: "students",
  foreignKey: "vaccine_id",
});

//Students - Activity_participants (1-N)

db.students.hasMany(db.activity_participants, {
  as: "activity_participants",
  foreignKey: "student_id",
});
db.activity_participants.belongsTo(db.students, {
  as: "student",
  foreignKey: "student_id",
});
// Student - ClassStudents (1-N)
db.students.hasMany(db.class_students, {
  as: "class_students",
  foreignKey: "student_id",
});
db.class_students.belongsTo(db.students, {
  as: "student",
  foreignKey: "student_id",
});

// Student - Student Vaccines (1-N)
db.students.hasMany(db.student_vaccines, {
  as: "student_vaccines",
  foreignKey: "student_id",
});
db.student_vaccines.belongsTo(db.students, {
  as: "student",
  foreignKey: "student_id",
});

// Class - Schedule (1-N)
db.classes.hasMany(db.schedule, { as: "schedules", foreignKey: "class_id" });
db.schedule.belongsTo(db.classes, { as: "class", foreignKey: "class_id" });

// Class - Attendance (1-N)
db.classes.hasMany(db.attendance, {
  as: "attendances",
  foreignKey: "class_id",
});
db.attendance.belongsTo(db.classes, { as: "class", foreignKey: "class_id" });

// Class - Class Activities (1-N)
db.classes.hasMany(db.class_activities, {
  as: "class_activities",
  foreignKey: "class_id",
});
db.class_activities.belongsTo(db.classes, {
  as: "class",
  foreignKey: "class_id",
});

// Class - Class Students (1-N)
db.classes.hasMany(db.class_students, {
  as: "class_students",
  foreignKey: "class_id",
});
db.class_students.belongsTo(db.classes, {
  as: "class",
  foreignKey: "class_id",
});

// Activity - Assessments (1-N)
db.activities.hasMany(db.assessments, {
  as: "assessments",
  foreignKey: "activity_id",
});
db.assessments.belongsTo(db.activities, {
  as: "activity",
  foreignKey: "activity_id",
});

// Activity - Class Activities (1-N)
db.activities.hasMany(db.class_activities, {
  as: "class_activities",
  foreignKey: "activity_id",
});
db.class_activities.belongsTo(db.activities, {
  as: "activity",
  foreignKey: "activity_id",
});

// Activity - Teacher Activities (1-N)
db.activities.hasMany(db.teacher_activities, {
  as: "teacher_activities",
  foreignKey: "activity_id",
});
db.teacher_activities.belongsTo(db.activities, {
  as: "activity",
  foreignKey: "activity_id",
});
// Activity - Activity Participants (1-N)
db.activities.hasMany(db.activity_participants, {
  as: "activity_participants",
  foreignKey: "activity_id",
});

db.activity_participants.belongsTo(db.activities, {
  as: "activities",
  foreignKey: "activity_id",
});

// Chat Room - Messages (1-N)
db.chat_rooms.hasMany(db.messages, {
  as: "messages",
  foreignKey: "chat_room_id",
});
db.messages.belongsTo(db.chat_rooms, {
  as: "chat_room",
  foreignKey: "chat_room_id",
});

// Message - Message Status (1-N)
db.messages.hasMany(db.message_status, {
  as: "message_statuses",
  foreignKey: "message_id",
});
db.message_status.belongsTo(db.messages, {
  as: "message",
  foreignKey: "message_id",
});

// Extracurricular Activities - Activity Participants (1-N)
db.extracurricular_activities.hasMany(db.activity_participants, {
  as: "activity_participants",
  foreignKey: "activity_id",
});
db.activity_participants.belongsTo(db.extracurricular_activities, {
  as: "activity",
  foreignKey: "activity_id",
});

// Vaccines - Student Vaccines (1-N)
db.vaccines.hasMany(db.student_vaccines, {
  as: "student_vaccines",
  foreignKey: "vaccine_id",
});
db.student_vaccines.belongsTo(db.vaccines, {
  as: "vaccine",
  foreignKey: "vaccine_id",
});

// Chatroom - Chatroom User (1-N)
db.chat_rooms.hasMany(db.chat_room_users, {
  as: "chat_room_users",
  foreignKey: "chat_room_id",
});
db.chat_room_users.belongsTo(db.chat_rooms, {
  as: "chat_room",
  foreignKey: "chat_room_id",
});

// Chatroom User - User (1-N)
db.users.hasMany(db.chat_room_users, {
  foreignKey: "user_id",
  as: "chatRooms",
});
db.chat_room_users.belongsTo(db.users, { foreignKey: "user_id" });

// Quan hệ Chat Room - Messages (1:N)
db.chat_rooms.hasMany(db.messages, { foreignKey: "chat_room_id", as: "messages_room" });
db.messages.belongsTo(db.chat_rooms, { foreignKey: "chat_room_id" });

// Quan hệ Messages - User (Sender) (1:N)
db.users.hasMany(db.messages, { foreignKey: "sender_id", as: "sentMessages" });
db.messages.belongsTo(db.users, { foreignKey: "sender_id", as: "sender_user" });

// Quan hệ Messages - Message Status (1:N)
db.messages.hasMany(db.message_status, { foreignKey: "message_id", as: "statuses" });
db.message_status.belongsTo(db.messages, { foreignKey: "message_id" });

// Quan hệ Users - Message Status (1:N)
db.users.hasMany(db.message_status, { foreignKey: "user_id", as: "messageStatuses" });
db.message_status.belongsTo(db.users, { foreignKey: "user_id" });

// Export object db
module.exports = db;
