#  ChattingApp

A real-time chat application built with **ASP.NET Core** and **SignalR**, supporting broadcast messaging to all connected users as well as group-based messaging. The project includes a backend (SignalR Hub) and a simple frontend (HTML/CSS/JS) for testing.

---

##  Features

| Feature | Description |
|---|---|
| **Send to All** | Broadcasts a message to all connected users |
| **Join / Leave Group** | Join or leave any named group |
| **Send to Group** | Sends a message to members of a specific group only |
| **Auto Reconnect** | The client automatically attempts to reconnect if the connection drops |
| **Connection Status UI** | Indicator showing connection state (Connected / Disconnected / Reconnecting) |
| **CORS Enabled** | Enabled so the frontend can communicate with the Hub from a different origin |

---

##  Tech Stack

- **Backend:** ASP.NET Core, SignalR (`Microsoft.AspNetCore.SignalR`)
- **Frontend:** HTML, CSS, Vanilla JS + `@microsoft/signalr` client library
