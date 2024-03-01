document.addEventListener("DOMContentLoaded", function () {
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");
  const endOfSchoolCountdownElement = document.getElementById("endOfSchoolCountdown");
  const firstLunchCountdownElement = document.getElementById("firstLunchCountdown");
  const secondLunchCountdownElement = document.getElementById("secondLunchCountdown");

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

    updateCountdown(15, 10, endOfSchoolCountdownElement, "School Ended! 🔥🎉");
    updateCountdownForLunch(11, 50, firstLunchCountdownElement, "1st Lunch Ended! 🎉");
    updateCountdownForLunch(12, 45, secondLunchCountdownElement, "2nd Lunch Ended! 🎉");
  }

  function updateCountdown(hours, minutes, countdownElement, finishMessage) {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(hours, minutes, 0);

    if (
      now.getHours() === 0 &&
      now.getMinutes() === 0 &&
      now.getSeconds() === 0 &&
      now.getTimezoneOffset() === -480
    ) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeDifference = targetTime - now;

    if (timeDifference > 0) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownElement.innerText = `Countdown: ${hours}h ${minutes}m ${seconds}s`;
    } else {
      countdownElement.innerText = finishMessage;
      setTimeout(() => {
        countdownElement.innerText = "";
        updateCountdown(hours, minutes, countdownElement, finishMessage);
      }, 10000);
    }
  }

  function updateCountdownForLunch(hours, minutes, countdownElement, finishMessage) {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(hours, minutes, 0);

    if (
      now.getHours() === 0 &&
      now.getMinutes() === 0 &&
      now.getSeconds() === 0 &&
      now.getTimezoneOffset() === -480
    ) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeDifference = targetTime - now;

    if (timeDifference > 0) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownElement.innerText = `Countdown: ${hours}h ${minutes}m ${seconds}s`;
    } else {
      countdownElement.innerText = finishMessage;
      setTimeout(() => {
        countdownElement.innerText = "";
        updateCountdownForLunch(hours, minutes, countdownElement, finishMessage);
      }, 10000);
    }
  }

function updateEverySecond() {
    updateTimeAndDate();
    updateCountdown(15, 10, endOfSchoolCountdownElement, "School Ended! 🔥🎉");
    updateCountdown(11, 50, firstLunchCountdownElement, "1st Lunch Ended! 🎉");
    updateCountdown(12, 45, secondLunchCountdownElement, "2nd Lunch Ended! 🎉");
    updateCountdown(15, 10, timeUntilSchoolEndsElement, "School Ended! 🔥🎉");
}

setInterval(updateEverySecond, 1000);
updateTimeAndDate();

setInterval(updateEverySecond, 1000);
updateTimeAndDate();
