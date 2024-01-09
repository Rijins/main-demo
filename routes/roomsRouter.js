const express = require("express");
const router = express.Router();
const Room = require('../model/room');

// Route to get all rooms
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get room by ID
router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid;
    try {
      const foundRoom = await Room.findOne({ _id: roomid });
      res.send(foundRoom);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
});

// Route to add a new room
router.post("/addroom", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();
    res.send("New Room Added Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update room details
router.put("/updateroom/:id", async (req, res) => {
  const roomId = req.params.id;
  const updatedRoomDetails = req.body;

  try {
    await Room.updateOne({ _id: roomId }, { $set: updatedRoomDetails });
    res.send("Room updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a room by ID
// Route to delete a room by ID
router.delete("/deleteroom/:id", async (req, res) => {
  const roomId = req.params.id;
  try {
    const deletedRoom = await Room.findOneAndDelete({ _id: roomId });
    if (deletedRoom) {
      res.send("Room deleted successfully");
    } else {
      res.status(404).send("Room not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
