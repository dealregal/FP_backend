const express = require('express');
const router = express.Router();
const { myIo, skt } = require("../controller/socket-server");

// Route to send a message to all connected clients
router.post("/broadcast", async (req, res) => {
  try {
    const { event, data } = req.body;

    // Validate input
    if (!event || !data) {
      return res.status(400).json({ 
        status: false, 
        message: "Event and data are required" 
      });
    }

    // Check if myIo is initialized
    if (myIo && myIo.sockets) {
      // Broadcast to all connected clients
      myIo.sockets.emit(event, data);
      
      return res.json({ 
        status: true, 
        message: "Message broadcasted successfully" 
      });
    } else {
      return res.status(500).json({ 
        status: false, 
        message: "Socket.io is not initialized" 
      });
    }
  } catch (error) {
    console.error("Broadcast error:", error);
    return res.status(500).json({ 
      status: false, 
      message: "Error broadcasting message" 
    });
  }
});

// Route to send a message to a specific user
router.post("/send-to-user", async (req, res) => {
  try {
    const { userId, event, data } = req.body;

    // Validate input
    if (!userId || !event || !data) {
      return res.status(400).json({ 
        status: false, 
        message: "User ID, event, and data are required" 
      });
    }

    // Check if myIo is initialized
    if (myIo && myIo.sockets) {
      // Find socket by user ID and send message
      const userSocket = Array.from(myIo.sockets.sockets.values()).find(
        socket => socket.uid === userId
      );

      if (userSocket) {
        userSocket.emit(event, data);
        return res.json({ 
          status: true, 
          message: "Message sent to user successfully" 
        });
      } else {
        return res.status(404).json({ 
          status: false, 
          message: "User socket not found" 
        });
      }
    } else {
      return res.status(500).json({ 
        status: false, 
        message: "Socket.io is not initialized" 
      });
    }
  } catch (error) {
    console.error("Send to user error:", error);
    return res.status(500).json({ 
      status: false, 
      message: "Error sending message to user" 
    });
  }
});

module.exports = router;