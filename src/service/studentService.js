import md5 from "md5";
import Student from "../model/studentModel.js";
import { tokenEncode } from "./../utilis/tokenUtils.js";

//create student
export const studentCreateService = async (req, res) => {
  try {
    let reqBody = req.body;
    // hashing password
    reqBody.password = md5(req.body.password);

    // excisting user
    const existingUser = await Student.findOne({ email: reqBody.email });
    if (existingUser) {
      return res.status(409).json({
        status: "faild",
        message: "Student already created. try with different email",
      });
    }

    // student create
    const data = await Student.create(reqBody);
    return res.status(201).json({
      status: "success",
      message: "Student created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "faild",
      message: error.message,
    });
  }
};

// login Student
export const studentLoginService = async (req, res) => {
  try {
    let { email, password } = req.body;

    // hash password
    password = md5(password);

    // check student
    const data = await Student.aggregate([
      { $match: { email, password } },
      { $project: { _id: 1, email: 1 } },
    ]);

    // if email and password is correct
    if (data.length > 0) {
      // generate token
      const token = tokenEncode(data[0].email);

      // set cookie
      const options = {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      };

      // send token in cookie
      res.cookie("Token", token, options);

      return res.status(200).json({
        status: "success",
        message: "login successful",
        data,
        token,
      });
    } else {
      return res.status(401).json({
        status: "faild",
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "faild",
      message: error.message,
    });
  }
};

// student profile read
export const studentProfileService = async (req, res) => {
  try {
    const email = req.headers.email;

    // match stage
    const matchStage = {
      $match: { email },
    };

    // project stage
    const projectStage = {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
      },
    };

    const data = await Student.aggregate([matchStage, projectStage]);
    return res.status(200).json({
      status: "success",
      message: "Student profile read successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// student profile Update
export const studentProfilUpdateService = async (req, res) => {
  try {
    const email = req.headers.email;
    const reqBody = req.body;

    const data = await Student.updateOne({ email }, reqBody);

    return res.status(200).json({
      status: "success",
      message: "Student profile update successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// logout student
export const studentLogoutService = async (req, res) => {
  try {
    // clear Cookie
    res.clearCookie("Token");
    return res.status(200).json({
      status: "success",
      message: "logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      status: "faild",
      message: error.message,
    });
  }
};
