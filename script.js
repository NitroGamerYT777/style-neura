document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    function addMessage(sender, message) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chat-message", sender);
        msgDiv.innerHTML = `<p>${message}</p>`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function sendMessage() {
        let message = userInput.value.trim();
        if (message === "") return;

        addMessage("user", message);
        userInput.value = "";

        try {
            let response = await fetch("/chat", {  // URL ni o'zgartirdik
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: message })
            });

            let data = await response.json();
            addMessage("bot", data.reply);
        } catch (error) {
            addMessage("bot", "Xatolik yuz berdi!");
        }
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});