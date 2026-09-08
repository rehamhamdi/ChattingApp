
const statusElement = document.getElementById("status");

const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const groupNameInput = document.getElementById("groupName");

const sendAllButton = document.getElementById("sendAll");
const joinGroupButton = document.getElementById("joinGroup");
const leaveGroupButton = document.getElementById("leaveGroup");
const sendGroupButton = document.getElementById("sendGroup");

const messagesContainer = document.getElementById("messages");


const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7059/chatHub")
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function startConnection() {

    try {

        await connection.start();

        statusElement.textContent = "Connected";
        statusElement.className = "status connected";

        console.log("SignalR Connected");

    }
    catch (error) {

        console.error("Connection failed:", error);

        statusElement.textContent = "Disconnected";
        statusElement.className = "status disconnected";
    }
}

// Receive Message

connection.on("ReceiveMessage", function (user, message) {

    console.log("Received:", user, message);

    addMessage(user, message);
});

// Display Message

function addMessage(user, message) {

    const messageElement = document.createElement("div");

    messageElement.classList.add("message");

    messageElement.innerHTML =
        `<strong>${user}:</strong> ${message}`;

    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;
}

// Send Message To Everyone

sendAllButton.addEventListener("click", async function () {

    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (!username || !message) {

        alert("Enter username and message");

        return;
    }

    try {

        await connection.invoke(
            "SendToAll",
            username,
            message
        );

        messageInput.value = "";

    }
    catch (error) {

        console.error("SendToAll error:", error);
    }
});


// Join Group

joinGroupButton.addEventListener("click", async function () {

    const groupName = groupNameInput.value.trim();

    if (!groupName) {

        alert("Enter group name");

        return;
    }

    try {

        await connection.invoke(
            "JoinGroup",
            groupName
        );

        console.log(`Joined group: ${groupName}`);

    }
    catch (error) {

        console.error("JoinGroup error:", error);
    }
});


// Leave Group

leaveGroupButton.addEventListener("click", async function () {

    const groupName = groupNameInput.value.trim();

    if (!groupName) {

        alert("Enter group name");

        return;
    }

    try {

        await connection.invoke(
            "LeaveGroup",
            groupName
        );

        console.log(`Left group: ${groupName}`);

    }
    catch (error) {

        console.error("LeaveGroup error:", error);
    }
});


// Send Message To Group

sendGroupButton.addEventListener("click", async function () {

    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();
    const groupName = groupNameInput.value.trim();

    if (!username || !message || !groupName) {

        alert("Enter username, message and group");

        return;
    }

    try {

        await connection.invoke(
            "SendToGroup",
            groupName,
            username,
            message
        );

        messageInput.value = "";

    }
    catch (error) {

        console.error("SendToGroup error:", error);
    }
});


connection.onreconnecting(function (error) {

    statusElement.textContent = "Reconnecting...";
    statusElement.className = "status reconnecting";

    console.log("SignalR Reconnecting...", error);
});


connection.onreconnected(function (connectionId) {

    statusElement.textContent = "Connected";
    statusElement.className = "status connected";

    console.log(
        "SignalR Reconnected. Connection ID:",
        connectionId
    );
});

connection.onclose(function (error) {

    statusElement.textContent = "Disconnected";
    statusElement.className = "status disconnected";

    console.log("SignalR Connection Closed", error);
});

// Connection Test

connection.on("ConnectionTest", function (connectionId) {

    console.log(
        "Connection Test. Connection ID:",
        connectionId
    );
});

startConnection();