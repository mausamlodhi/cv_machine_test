import httpStatus from "http-status";
import repositories from "../repositories";
import { showConsoleLogs } from "../utility";

const { accountRepository } = repositories;
export default {
  async userSignup(req, res, next) {
    try {
      console.log(req.body)
      const {
        body: { firstName, lastName, email, phoneNumber, password, role },
      } = req;
      const signupData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role,
      };
      const result = await accountRepository.createUser(signupData);
      if (result) {
        return res.status(httpStatus.OK).json({
          status: true,
          data: result,
          message: "SIGNUP_SUCCESS",
        });
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: false,
          data: null,
          message: "SOMETHING_WENT_WRONG",
        });
      }
    } catch (error) {
      console.log(error)
      showConsoleLogs(error);
      next(error);
    }
  },
  async userLogin(req, res, next) {
    try {
      const {
        body: { email, password },
      } = req;
      const loginData = { email, password };
      const result = await accountRepository.login(loginData);
      if (result.status) {
        return res.status(httpStatus.OK).json({
          status: true,
          data: result?.data,
          message: "LOGIN_SUCCESS",
        });
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: false,
          data: result?.data,
          message: result.message,
        });
      }
    } catch (error) {
      showConsoleLogs(error);
      next(error);
    }
  },
};
