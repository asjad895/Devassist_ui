document.getElementById('chatbot-toggle-btn').addEventListener('click', function() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    chatbotPopup.style.display = chatbotPopup.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('close-btn').addEventListener('click', function() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    chatbotPopup.style.display = 'none';
});

document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    // Display user message
    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Clear input field
    document.getElementById('user-input').value = '';

    // Make POST request to fetch bot response
    fetch('https://bad1-13-71-3-101.ngrok-free.app/chat/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        // Check if data has a response key
        if (data.response) {
            // Display bot response
            const botMessage = document.createElement('div');
            botMessage.classList.add('bot-message');
            botMessage.textContent = data.response;
            chatBox.appendChild(botMessage);

            // Scroll to bottom to show latest message
            chatBox.scrollTop = chatBox.scrollHeight;
        } else {
            console.error('Invalid response format', data);
            const botMessage = document.createElement('div');
            botMessage.classList.add('bot-message');
            botMessage.textContent = data.error;
            chatBox.appendChild(botMessage);

            // Scroll to bottom to show latest message
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    })
    .catch(error => {
        console.error('Error fetching bot response:', error);
    });
});
