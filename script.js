document.addEventListener("DOMContentLoaded", function () {
  // Get HTML elements
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");
  const countdownElement = document.getElementById("countdown");
  const countdown310Element = document.getElementById("countdown310");
  const instagramHandleElement = document.getElementById("instagramHandle");
  const introImageElement = document.getElementById("introImage");
  const randomTextElement = document.getElementById("randomText");
  const firstLunchCountdownElement = document.getElementById("firstLunchCountdown");
  const secondLunchCountdownElement = document.getElementById("secondLunchCountdown");

  // Function to update time and date
  function updateTimeAndDate() {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = now.toLocaleDateString("en-US", options);
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    dateElement.innerText = formattedDate;
    timeElement.innerText = formattedTime;

    // Update countdown for 3:10 PM
    updateCountdownFor3PM();
    // Update countdown for 1st Lunch
    updateCountdownForLunch(11, 50, firstLunchCountdownElement, "1st Lunch Countdown is done!");
    // Update countdown for 2nd Lunch
    updateCountdownForLunch(12, 45, secondLunchCountdownElement, "2nd Lunch Countdown is done!");
  }

  // Function to update countdown for a specific time
  function updateCountdownForLunch(hours, minutes, countdownElement, finishMessage) {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(hours, minutes, 0);

    // If it's past 12 AM, reset countdown to lunch time
    if (
      now.getHours() === 0 &&
      now.getMinutes() === 0 &&
      now.getSeconds() === 0 &&
      now.getTimezoneOffset() === -480
    ) {
      targetTime.setDate(targetTime.getDate() + 1); // Move to the next day
    }

    const timeDifference = targetTime - now;

    if (timeDifference > 0) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownElement.innerText = `Countdown: ${hours}h ${minutes}m ${seconds}s`;
    } else {
      countdownElement.innerText = finishMessage;
      setTimeout(() => {
        countdownElement.innerText = ""; // Clear the message after 10 seconds
        updateCountdownForLunch(hours, minutes, countdownElement, finishMessage);
      }, 10000); // Display the finish message for 10 seconds
    }
  }

  // Function to handle the introductory image
  function showIntroImage() {
    introImageElement.style.display = "block";
    let secondsRemaining = 2;

    // Update the countdown for the introductory image
    const introImageCountdown = setInterval(function () {
      secondsRemaining--;

      if (secondsRemaining > 0) {
        introImageElement.innerText = `${secondsRemaining}s remaining`;
      } else {
        introImageElement.style.display = "none";
        clearInterval(introImageCountdown);
        updateEverySecond();
      }
    }, 1000);
  }

  // Function to update random text every 3 seconds
  function updateRandomText() {
    const texts = [
      "Ya'll don't know how to do math?",
      "Ya'll must be hella bored 💀",
    ];
    const randomIndex = Math.floor(Math.random() * texts.length);
    randomTextElement.innerText = texts[randomIndex];
  }

  // Function to update time, date, and countdown every second
  function updateEverySecond() {
    updateTimeAndDate();
    updateCountdownFor3PM();
    updateCountdownForLunch(11, 50, firstLunchCountdownElement, "1st Lunch Countdown is done!");
    updateCountdownForLunch(12, 45, secondLunchCountdownElement, "2nd Lunch Countdown is done!");
  }

  // Initial setup
  showIntroImage();

  // Update time, date, and countdown every second
  setInterval(updateEverySecond, 1000);

  // Update countdown for 3:10 PM initially
  updateCountdownFor3PM();

  // Update countdown for 3:10 PM every second
  setInterval(updateCountdownFor3PM, 1000);

  // Update random text every 3 seconds
  setInterval(updateRandomText, 3000);
});
