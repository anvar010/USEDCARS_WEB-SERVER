import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const registerController = async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).send({
          message: "User already exists",
          success: false,
        });
      }
  
      if (req.body.password !== req.body.passwordConfirm) {
        return res.status(400).send({
          message: "Passwords do not match",
          success: false,
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
  
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashPassword,
        userType: req.body.userType 
      });
  
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      return res.status(201).send({
        message: "Register successfully",
        data: {
          user: newUser,
          token,
        },
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Register error",
        success: false,
      });
    }
  };
  

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).send({
                message: "Email is required",
                success: false
            });
        }

        if (!password) {
            return res.status(400).send({
                message: "Password is required",
                success: false
            });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(200).send({
                message: "User not found",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        user.password = undefined;

        return res.status(201).send({
            message: "Login successfully",
            data: {
                user,
                token
            },
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Auth error"
        });
    }
};

export const getUserDataController = async (req, res) => {
    try {
      
      const users = await User.find({ userType: 'user' });
  
      
      return res.status(200).json({
        success: true,
        data: users,
        message: 'Users retrieved successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve users',
      });
    }
  };
  
  

export default { registerController,
loginController ,
getUserDataController};
