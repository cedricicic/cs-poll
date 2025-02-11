function checkPollStatus() {
  console.log("Checking poll status...");

  const pollText = document.body.textContent;

  if (!pollText.includes("Poll not currently active")) {
    console.log("Poll is active! Changing background color...");
    document.body.style.backgroundColor = "#ff2a00";
    chrome.runtime.sendMessage({
      type: "POLL_ACTIVE",
    });
  } else {
    console.log("Poll is not active. Resetting background color...");
    document.body.style.backgroundColor = "";
  }
}

function triggerCheckAgain() {
  console.log("Attempting to trigger 'Check again' link...");

  const checkAgainLink = Array.from(document.querySelectorAll("a")).find(
    (link) => link.textContent.includes("Check again")
  );

  if (checkAgainLink) {
    console.log("Found 'Check again' link. Clicking it...");
    checkAgainLink.click();
  } else {
    console.warn("Could not find the 'Check again' link.");
  }
}

console.log("Initial poll status check...");
checkPollStatus();

console.log("Setting up MutationObserver to watch for DOM changes...");
const observer = new MutationObserver(checkPollStatus);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

console.log(
  "Setting up interval to trigger 'Check again' link every 5 seconds..."
);

let countdown = 5;

const countdownInterval = setInterval(() => {
  console.log(countdown);
  countdown--;

  if (countdown === 0) {
    clearInterval(countdownInterval);
    console.log("Starting interval...");

    setInterval(() => {
      console.log(
        "Interval triggered. Checking poll status and triggering 'Check again' link..."
      );
      checkPollStatus();
      triggerCheckAgain();
    }, 5000);
  }
}, 1000);