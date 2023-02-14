// Loader when chat is generating
function loader(element) {
  element.textContent = "";

  let loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += ".";

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);

  return loadInterval;
}

// Typing text effect
function typeText(text) {
  let index = 0;

  const returnText = "";
  let interval = setInterval(() => {
    if (index < text.length) {
      returnText += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
  return returnText;
}

export { loader, typeText };
