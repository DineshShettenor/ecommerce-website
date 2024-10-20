const express = require("express");
const User = require("./user.model");
const generateToken = require("../middleware/generateToken");
// const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// register end point
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: "user registered successfully" });
  } catch (error) {
    console.log("Error while registering : ", error);
    res.status(500).send({ message: "Error registering user" });
  }
});

// login end point
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //   console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "password not matched" });
    }
    const token = await generateToken(user._id);
    //   console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).send({
      message: "loggin in successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.log("Error while registering : ", error);
    res.status(500).send({ message: "Error login user" });
  }
});

// logout end point
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "logged out successfully" });
});

// delete a user end point
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    console.log("deleted");
    res.status(200).send({ message: "user deleted successfully" });
  } catch (error) {
    console.log("Error while registering : ", error);
    res.status(500).send({ message: "Error login user" });
  }
});

// get all users end point
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "id email role").sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.log("Error while registering : ", error);
    res.status(500).send({ message: "Error login user" });
  }
});

// update users role end point
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    res.status(200).send({ message: "user role updated successfulley", user });
  } catch (error) {
    console.log("Error updating user role : ", error);
    res.status(500).send({ message: "Error updating user role" });
  }
});

// edit or update user profile end point
router.patch("/edit-profile", async (req, res) => {
  try {
    const { userId, username, profileImage, bio, profession } = req.body;
    console.log(userId);
    if (!userId) {
      return res.status(404).send({ message: "userId not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    //   update profile
    if (username !== undefined) user.username = username;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;

    await user.save();
    res.status(200).send({
      message: "Profile Updated Successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.log("Error updating user profile : ", error);
    res.status(500).send({ message: "Error updating user profile" });
  }
});

// all users
// router.get("/users", verifyToken, async (req, res) => {
//   res.send({ message: "Protected user" });
// });

module.exports = router;
