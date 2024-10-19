const express = require("express");

const router = express.Router();
const User = require("../modals/user.model");

async function generateCustomId() {
  const latestUser = await User.findOne().sort({ id: -1 });
  const latestId = latestUser ? latestUser.id : 0;
  return latestId + 1 || 1;
}

router.get("", async (req, res) => {
  try {
    const usersList = await User.find().lean().exec();

    return res.status(200).send({
      data: usersList,
      message: "Users Listing fetched",
    });
  } catch (err) {
    return res.send(500).send({ message: err.message });
  }
});

router.post("", async (req, res) => {
  const userId = await generateCustomId();

  console.log(userId, "userId");
  try {
    // 1. method1 using data.save()
    // const data = new User({
    //   ...req.body,
    //   id: userId,
    // });
    // const savedUser = await data.save();

    //2.  method2
    const savedUser = await User.create({
      ...req.body,
      id: userId,
    });

    return res.status(200).send({
      data: savedUser,
      message: "User created successfully !",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
