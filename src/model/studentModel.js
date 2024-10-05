import mongoose from "mongoose";

// user schema create
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Student = mongoose.model("students", studentSchema);

//export
export default Student;
