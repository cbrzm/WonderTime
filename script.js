document.addEventListener("DOMContentLoaded", function () {
  // Get HTML elements
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");
  const countdownElement = document.getElementById("countdown");
  const countdown310Element = document.getElementById("countdown310");
  const instagramHandleElement = document.getElementById("instagramHandle");
  const introImageElement = document.getElementById("introImage");
  const randomTextElement = document.getElementById("randomText");

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
  }

  // Function to update countdown for 3:10 PM
  function updateCountdownFor3PM() {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(15, 10, 0); // Set target time to 3:10 PM

    // If it's past 12 AM in Las Vegas, reset countdown to 3:10 PM
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

      countdown310Element.innerText = `Countdown for 3:10 PM: ${hours}h ${minutes}m ${seconds}s`;
    } else {
      countdown310Element.innerText = "School Ended! 🎉🔥🎉";
      clearInterval(countdown310Interval);
      setTimeout(() => {
        updateCountdownFor3PM();
        countdown310Interval = setInterval(updateCountdownFor3PM, 1000); // Restart countdown at 3:10 PM
      }, 10000); // Display "School Ended" message for 10 seconds
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
      "Never Watch Skibidi Toilet!🤮"
  
    ];
    const randomIndex = Math.floor(Math.random() * texts.length);
    randomTextElement.innerText = texts[randomIndex];
  }

  // Function to update time, date, and countdown every second
  function updateEverySecond() {
    updateTimeAndDate();
    updateCountdownFor3PM();
    // Add more specific logic for different periods if needed
  }

  // Initial setup
  showIntroImage();

  // Update time, date, and countdown every second
  setInterval(updateEverySecond, 1000);

  // Update countdown for 3:10 PM initially
  updateCountdownFor3PM();

  // Update countdown for 3:10 PM every second
  let countdown310Interval = setInterval(updateCountdownFor3PM, 1000);

  // Update random text every 3 seconds
  setInterval(updateRandomText, 3000);
});