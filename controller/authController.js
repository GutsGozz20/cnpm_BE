const Point = require("../model/Point");
const User = require("../model/User");
const argon = require("argon2");

const authController = {
  register: async (req, res, next) => {
    try {
      var { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res
          .status(404)
          .json({ error: "Please provide required field values" });
      }

      const existEmail = await User.findOne({ email });
      if (existEmail) {
        return res.status(404).json({ error: "Email already exists" });
      }
      // Mã hóa password
      password = await argon.hash(password);

      const newUser = new User({ username, email, password });

      await newUser.save();

      return res.status(201).json({ success: "Registration successful" });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Please provide email and password" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify password
      const isCorrect = await argon.verify(user.password, password);
      if (!isCorrect) {
        return res.status(400).json({ error: "Incorrect password" });
      }
      return res.status(200).json({ success: "Login successful", user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const allUser = await User.find({}, { username: 1, email: 1, _id: 1, password: 1 })
      return res.json({ success: true, data: allUser })
    } catch (error) {
      console.log(error);
    }
  },

  createUser: async (req, res) => {
    let { username, email, password } = req.body;
    try {
      if (!username || !email || !password) {
        return res
          .status(404)
          .json({ error: "Please provide required field values" });
      }

      const existEmail = await User.findOne({ email });
      if (existEmail) {
        return res.status(404).json({ error: "Email already exists" });
      }
      // Mã hóa password
      password = await argon.hash(password);
      console.log(password);

      const newUser = new User({ username, email, password });
      await newUser.save();
      console.log(newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  readAllUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateUser: async (req, res) => {
    console.log("Request Params:", req.params); // Log request params
    console.log("Request Body:", req.body);
    const { username, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { username, email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },


  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  totalScore: async (req, res) => {
    const { userId, score } = req.body;
    try {
      // Lưu điểm số vào cơ sở dữ liệu
      const newScore = new Point({ userId, score });
      await newScore.save();
      res.json({ success: true, message: 'Score submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to submit score' });
    }
  },

};


// crud ctrl


module.exports = authController;


