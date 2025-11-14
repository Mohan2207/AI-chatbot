document.addEventListener("DOMContentLoaded", () => {
    // 1. DOM Element References
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // 2. Simple Bot Responses Database
    const botResponses = {
        "hello": "Hi there! How can I assist you today?",
        "hi": "Hello! How can I help you?",
        "hey":"What happend bro",
        "how are you": "I'm doing well, thank you! How about you?",
        "what can you do": "I can answer simple questions and handle basic conversations.",
        "bye": "Goodbye! Have a great day!",
        // The 'default' key is a reserved fallback
        "default": "I'm not sure I understand. Could you try asking something else?"
    };

    // 3. Function to Add Message to Chat Interface
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        
        // Add specific class for user or bot message
        if (isUser) {
            messageDiv.classList.add("user-message");
        } else {
            messageDiv.classList.add("bot-message");
        }

        const messageText = document.createElement("p");
        messageText.textContent = message;
        messageDiv.appendChild(messageText);

        chatMessages.appendChild(messageDiv);
        
        // Auto-scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 4. Corrected Function to Get Bot Response
    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase().trim();

        // *CORRECTED LOGIC:* Iterate through botResponses keys to see if 
        // the user's message includes a key.
        for (const [key, value] of Object.entries(botResponses)) {
            // Skip the default response during the search
            if (key !== "default" && lowerMessage.includes(key)) {
                return value;
            }
        }

        // Return the default response if no key is found
        return botResponses.default;
    }

    // 5. Main Send Message Function
    function sendMessage() {
        const message = userInput.value.trim();

        if (message) {
            // 1. Add user message to chat
            addMessage(message, true); 
            
            // 2. Clear the input field
            userInput.value = "";

            // 3. Generate bot response after a short delay (for a natural feel)
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse);
            }, 500); // 500 milliseconds delay
        }
    }

    // 6. Event Listeners

    // A. Send button click
    sendButton.addEventListener("click", sendMessage);

    // B. Enter key press in the input field
    userInput.addEventListener("keypress", (e) => {
        // Check if the key pressed is "Enter"
        if (e.key === "Enter") {
            // Prevent the default form submission (if any)
            e.preventDefault(); 
            sendMessage();
        }
    });
});