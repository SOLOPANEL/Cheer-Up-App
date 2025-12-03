const originalText = "Find Power/Find Joy"; // Changed to be more generic for both buttons
const originalColor = "var(--color-blue)"; 

const newText = "Reset";
const newColor = "var(--color-pink)"; // Defined in CSS vars for consistency

// Dynamic splash colors (joyful palette)
const splashColors = [
    'var(--color-pink)', 
    'var(--color-blue)', 
    'var(--color-green)',
    '#FFE0B2', // Soft Orange
    '#E1BEE7'  // Lavender
];

const motivationalMsg = [
    "You're braver than you believe, and stronger than you seem 💪",
    "The journey of a thousand miles begins with a single step 🚶‍♀️",
    "If it doesn't challenge you, it doesn't change you 🔥",
    "Opportunities don't happen, you create them 🌟",
    "It always seems impossible until it is done ✅",
    "The mind is everything. What you think you become 🤔",
    "The best view comes after the hardest climb 🏞️",
    "Today's pain is tomorrow's power ⚡",
    "Be stronger than your excuses 🚧",
    "Growth is the only evidence of life 🌱",
    "Doubt kills more dreams than failure ever will 💭",
    "Discipline is the bridge between goals and accomplishment 🌉",
    "The future belongs to those who believe in the beauty of their dreams ✨",
    "Change the world by being yourself 🌍",
    "Happiness is not by chance, but by choice 😊",
    "Go confidently in the direction of your dreams ➡️",
    "Take the risk or lose the chance 🎲",
    "Well done is better than well said 🗣️",
    "Make each day your masterpiece 🎨",
    "Believe in the magic of new beginnings 💫",
    "Be a voice, not an echo 📢",
];

const lovCareMsg = [
    "I love watching you shine.✨",
    "Take a breath; you've got this.😌",
    "I'm proud of all your small victories.🏆",
    "It's okay to rest and recharge.🔋",
    "Remember how amazing you are.💖",
    "Little by little, a little becomes a lot.🌱",
    "I believe in the power of your path.🗺️",
    "Be kind to yourself today.☕",
    "Your perspective is a gift to the world.🎁",
    "You don't have to be perfect, just be you.🌟",
    "Every day is a fresh opportunity to be happy.☀️",
    "Keep going, I'm right here with you.🤗",
    "Your feelings are valid and important.✔️",
    "Do what brings joy to your soul.😄",
    "The world is better because you are in it.🌎",
    "I admire your effort more than any result.💯",
    "Even on tough days, you are enough.🐻",
    "Remember to make time for yourself.🛀",
    "Progress, not perfection, is the goal.🎯",
    "I love you just the way you are.🥰",
    "Let's make today a beautiful adventure.🦋",
    "Lean on me when you need to.💪",
    "I appreciate your beautiful heart.💜",
    "Sending you the warmest hug right now.🫂",
    "You deserve all the good things in life.👑",
    "Every moment with you is a gift.🎀",
    "I'm always cheering for you from the sidelines.📣",
    "Don't let a bad moment define your day.🙅‍♀️",
    "Your resilience shines through everything.💎",
    "Just remember how much you are loved.❤️",
    "I believe in your inner magic.🪄",
    "Seeing your smile is the best part of my day.😁",
    "You are my favorite person, always.💘",
    "May your day be filled with small joys.🥳",
];


/**
 * Helper function to pick a random message from an array.
 * @param {Array<string>} messages - The array of quotes/messages.
 * @returns {string} A random message.
 */
function getDynamicMsg(messages) {
    const randomText = Math.floor(Math.random() * messages.length)
    return messages[randomText]
}

/**
 * Displays a message on the screen instead of using the disruptive alert().
 * @param {string} message - The message to display.
 */
function showMessage(message) {
    const display = document.getElementById("message-display");
    
    // Clear any existing timeout
    clearTimeout(display.timeoutId);

    display.textContent = message;
    display.classList.add('show');

    // Hide the message after 4 seconds
    display.timeoutId = setTimeout(() => {
        display.classList.remove('show');
    }, 3000);
}


/**
 * Main function to handle button click, toggling state and showing a message.
 * @param {HTMLButtonElement} buttonElement - The button that was clicked (passed via 'this').
 * @param {Array<string>} messageArray - The specific array of messages to use.
 */
function changeButton(buttonElement, messageArray) {
    let message = "";
    
    // Check the current state of the button
    if (buttonElement.style.backgroundColor === newColor) {
        // Revert to original state (Clicking again shows the message)
        const currentMessage = buttonElement.getAttribute('data-message');
        message = `${currentMessage}`;
        
        buttonElement.textContent = buttonElement.getAttribute('data-original-text') || "Find Power/Joy";
        buttonElement.style.backgroundColor = originalColor;

    } else {
        // Change to new state (First click gets the message)
        const randomQuote = getDynamicMsg(messageArray);
        message = randomQuote;

        // Store the quote on the button for later display/reset
        buttonElement.setAttribute('data-message', randomQuote);
        buttonElement.setAttribute('data-original-text', buttonElement.textContent);
        
        buttonElement.textContent = newText;
        buttonElement.style.backgroundColor = newColor;
    }
    
    showMessage(message);
}


/**
 * Creates a beautiful, unpredictable color splash effect at the click point.
 * This function is called from the <body> onclick="createSplash(event)".
 * @param {MouseEvent} event - The click event object.
 */
function createSplash(event) {
    // 1. Create the splash element
    const splash = document.createElement('div');
    splash.classList.add('splash');
    document.body.appendChild(splash);

    // 2. Get a random color
    const randomIndex = Math.floor(Math.random() * splashColors.length);
    const randomColor = splashColors[randomIndex];

    // 3. Position and color the splash at the click coordinates
    splash.style.left = `${event.clientX}px`;
    splash.style.top = `${event.clientY}px`;
    splash.style.backgroundColor = randomColor;

    // 4. Trigger the expansion (scale animation)
    // Needs a slight delay to ensure the browser registers the initial scale(0) state
    requestAnimationFrame(() => {
        splash.classList.add('active');
    });

    // 5. Clean up the element after the transition finishes (1.5 seconds)
    setTimeout(() => {
        splash.remove();
    }, 1500); 

}
