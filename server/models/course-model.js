const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseCode: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'users'  // Reference the User model
  }],
});

// Define the model or the collection name
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;