var DataTypes = require("sequelize").DataTypes;
var _activities = require("./activities");
var _activity_participants = require("./activity_participants");
var _assessments = require("./assessments");
var _attendance = require("./attendance");
var _chat_room_users = require("./chat_room_users");
var _chat_rooms = require("./chat_rooms");
var _class_activities = require("./class_activities");
var _class_students = require("./class_students");
var _classes = require("./classes");
var _extracurricular_activities = require("./extracurricular_activities");
var _feedback = require("./feedback");
var _health_records = require("./health_records");
var _message_status = require("./message_status");
var _messages = require("./messages");
var _notifications = require("./notifications");
var _payments = require("./payments");
var _roles = require("./roles");
var _schedule = require("./schedule");
var _student_vaccines = require("./student_vaccines");
var _students = require("./students");
var _teacher_activities = require("./teacher_activities");
var _teacher_class = require("./teacher_class");
var _user_roles = require("./user_roles");
var _users = require("./users");
var _vaccines = require("./vaccines");

function initModels(sequelize) {
  var activities = _activities(sequelize, DataTypes);
  var activity_participants = _activity_participants(sequelize, DataTypes);
  var assessments = _assessments(sequelize, DataTypes);
  var attendance = _attendance(sequelize, DataTypes);
  var chat_room_users = _chat_room_users(sequelize, DataTypes);
  var chat_rooms = _chat_rooms(sequelize, DataTypes);
  var class_activities = _class_activities(sequelize, DataTypes);
  var class_students = _class_students(sequelize, DataTypes);
  var classes = _classes(sequelize, DataTypes);
  var extracurricular_activities = _extracurricular_activities(sequelize, DataTypes);
  var feedback = _feedback(sequelize, DataTypes);
  var health_records = _health_records(sequelize, DataTypes);
  var message_status = _message_status(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var schedule = _schedule(sequelize, DataTypes);
  var student_vaccines = _student_vaccines(sequelize, DataTypes);
  var students = _students(sequelize, DataTypes);
  var teacher_activities = _teacher_activities(sequelize, DataTypes);
  var teacher_class = _teacher_class(sequelize, DataTypes);
  var user_roles = _user_roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vaccines = _vaccines(sequelize, DataTypes);

  activities.belongsToMany(classes, { as: 'class_id_classes', through: class_activities, foreignKey: "activity_id", otherKey: "class_id" });
  classes.belongsToMany(activities, { as: 'activity_id_activities', through: class_activities, foreignKey: "class_id", otherKey: "activity_id" });
  classes.belongsToMany(students, { as: 'student_id_students', through: class_students, foreignKey: "class_id", otherKey: "student_id" });
  classes.belongsToMany(users, { as: 'teacher_id_users', through: teacher_class, foreignKey: "class_id", otherKey: "teacher_id" });
  students.belongsToMany(classes, { as: 'class_id_classes_class_students', through: class_students, foreignKey: "student_id", otherKey: "class_id" });
  users.belongsToMany(classes, { as: 'class_id_classes_teacher_classes', through: teacher_class, foreignKey: "teacher_id", otherKey: "class_id" });
  assessments.belongsTo(activities, { as: "activity", foreignKey: "activity_id"});
  activities.hasMany(assessments, { as: "assessments", foreignKey: "activity_id"});
  class_activities.belongsTo(activities, { as: "activity", foreignKey: "activity_id"});
  activities.hasMany(class_activities, { as: "class_activities", foreignKey: "activity_id"});
  teacher_activities.belongsTo(activities, { as: "activity", foreignKey: "activity_id"});
  activities.hasMany(teacher_activities, { as: "teacher_activities", foreignKey: "activity_id"});
  chat_room_users.belongsTo(chat_rooms, { as: "chat_room", foreignKey: "chat_room_id"});
  chat_rooms.hasMany(chat_room_users, { as: "chat_room_users", foreignKey: "chat_room_id"});
  messages.belongsTo(chat_rooms, { as: "chat_room", foreignKey: "chat_room_id"});
  chat_rooms.hasMany(messages, { as: "messages", foreignKey: "chat_room_id"});
  attendance.belongsTo(classes, { as: "class", foreignKey: "class_id"});
  classes.hasMany(attendance, { as: "attendances", foreignKey: "class_id"});
  class_activities.belongsTo(classes, { as: "class", foreignKey: "class_id"});
  classes.hasMany(class_activities, { as: "class_activities", foreignKey: "class_id"});
  class_students.belongsTo(classes, { as: "class", foreignKey: "class_id"});
  classes.hasMany(class_students, { as: "class_students", foreignKey: "class_id"});
  schedule.belongsTo(classes, { as: "class", foreignKey: "class_id"});
  classes.hasMany(schedule, { as: "schedules", foreignKey: "class_id"});
  students.belongsTo(classes, { as: "class", foreignKey: "class_id"});
  classes.hasMany(students, { as: "students", foreignKey: "class_id"});
  teacher_class.belongsTo(classes, { as: "class", foreignKey: "class_id"});
  classes.hasMany(teacher_class, { as: "teacher_classes", foreignKey: "class_id"});
  activity_participants.belongsTo(extracurricular_activities, { as: "activity", foreignKey: "activity_id"});
  extracurricular_activities.hasMany(activity_participants, { as: "activity_participants", foreignKey: "activity_id"});
  message_status.belongsTo(messages, { as: "message", foreignKey: "message_id"});
  messages.hasMany(message_status, { as: "message_statuses", foreignKey: "message_id"});
  user_roles.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(user_roles, { as: "user_roles", foreignKey: "role_id"});
  activity_participants.belongsTo(students, { as: "student", foreignKey: "student_id"});
  students.hasMany(activity_participants, { as: "activity_participants", foreignKey: "student_id"});
  assessments.belongsTo(students, { as: "student", foreignKey: "student_id"});
  students.hasMany(assessments, { as: "assessments", foreignKey: "student_id"});
  attendance.belongsTo(students, { as: "student", foreignKey: "student_id"});
  students.hasMany(attendance, { as: "attendances", foreignKey: "student_id"});
  class_students.belongsTo(students, { as: "student", foreignKey: "student_id"});
  students.hasMany(class_students, { as: "class_students", foreignKey: "student_id"});
  health_records.belongsTo(students, { as: "student", foreignKey: "student_id"});
  students.hasMany(health_records, { as: "health_records", foreignKey: "student_id"});
  student_vaccines.belongsTo(students, { as: "student", foreignKey: "student_id"});
  students.hasMany(student_vaccines, { as: "student_vaccines", foreignKey: "student_id"});
  assessments.belongsTo(users, { as: "teacher", foreignKey: "teacher_id"});
  users.hasMany(assessments, { as: "assessments", foreignKey: "teacher_id"});
  chat_room_users.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(chat_room_users, { as: "chat_room_users", foreignKey: "user_id"});
  feedback.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(feedback, { as: "feedbacks", foreignKey: "user_id"});
  message_status.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(message_status, { as: "message_statuses", foreignKey: "user_id"});
  messages.belongsTo(users, { as: "sender", foreignKey: "sender_id"});
  users.hasMany(messages, { as: "messages", foreignKey: "sender_id"});
  notifications.belongsTo(users, { as: "recipient", foreignKey: "recipient_id"});
  users.hasMany(notifications, { as: "notifications", foreignKey: "recipient_id"});
  payments.belongsTo(users, { as: "parent", foreignKey: "parent_id"});
  users.hasMany(payments, { as: "payments", foreignKey: "parent_id"});
  schedule.belongsTo(users, { as: "teacher", foreignKey: "teacher_id"});
  users.hasMany(schedule, { as: "schedules", foreignKey: "teacher_id"});
  students.belongsTo(users, { as: "parent", foreignKey: "parent_id"});
  users.hasMany(students, { as: "students", foreignKey: "parent_id"});
  teacher_activities.belongsTo(users, { as: "teacher", foreignKey: "teacher_id"});
  users.hasMany(teacher_activities, { as: "teacher_activities", foreignKey: "teacher_id"});
  teacher_class.belongsTo(users, { as: "teacher", foreignKey: "teacher_id"});
  users.hasMany(teacher_class, { as: "teacher_classes", foreignKey: "teacher_id"});
  user_roles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_roles, { as: "user_roles", foreignKey: "user_id"});
  student_vaccines.belongsTo(vaccines, { as: "vaccine", foreignKey: "vaccine_id"});
  vaccines.hasMany(student_vaccines, { as: "student_vaccines", foreignKey: "vaccine_id"});

  return {
    activities,
    activity_participants,
    assessments,
    attendance,
    chat_room_users,
    chat_rooms,
    class_activities,
    class_students,
    classes,
    extracurricular_activities,
    feedback,
    health_records,
    message_status,
    messages,
    notifications,
    payments,
    roles,
    schedule,
    student_vaccines,
    students,
    teacher_activities,
    teacher_class,
    user_roles,
    users,
    vaccines,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
