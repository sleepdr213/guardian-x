const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)

// WebSocket setup
const io = new Server(server, {
  cors: { origin: "*" }
})

app.use(express.json())

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.json({ status: "Guardian X Backend Running" })
})

// 🚨 SOS ROUTE (CORE FEATURE)
app.post("/sos", (req, res) => {
  const payload = {
    type: "SOS",
    timestamp: Date.now()
  }

  console.log("🚨 SOS TRIGGERED", payload)

  // Send to all connected clients
  io.emit("alert", payload)

  res.json({ success: true })
})

// WebSocket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log("Server running on port", PORT)
})
