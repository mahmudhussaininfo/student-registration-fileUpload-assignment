import {
  studentCreateService,
  studentLoginService,
  studentLogoutService,
  studentProfileService,
  studentProfilUpdateService,
} from "../service/studentService.js";

// create students
export const studentCreate = async (req, res) => {
  const data = await studentCreateService(req, res);
  return data;
};

// Login students
export const studentLogin = async (req, res) => {
  const data = await studentLoginService(req, res);
  return data;
};

// Student Profile Read
export const studentProfileRead = async (req, res) => {
  const data = await studentProfileService(req, res);
  return data;
};

// Student Profile Update
export const studentProfileUpdate = async (req, res) => {
  const data = await studentProfilUpdateService(req, res);
  return data;
};

// Logout students
export const studentLogout = async (req, res) => {
  const data = await studentLogoutService(req, res);
  return data;
};
