const msPerWeek = 604800000;
const msPerDay = 86400000;
const msPerHour = 3600000;
const msPerMinute = 60000;
const msPerSecond = 1000;

function convertMsToString(timeInterval = 0) {
  let ms = timeInterval;
  let outputString = "";

  const weeks = Math.floor(ms / msPerWeek);
  ms %= msPerWeek;
  const days = Math.floor(ms / msPerDay);
  ms %= msPerDay;
  const hours = Math.floor(ms / msPerHour);
  ms %= msPerHour;
  const minutes = Math.floor(ms / msPerMinute);
  ms %= msPerMinute;
  const seconds = Math.floor(ms / msPerSecond);

  if (weeks > 0) outputString += `${weeks} Weeks `;
  if (days > 0) outputString += `${days} Days `;
  if (hours > 0) outputString += `${hours} Hours `;
  if (minutes > 0) outputString += `${minutes} Minutes `;
  if (seconds > 0) outputString += `${seconds} Seconds `;

  return outputString.trim();
}

// Weeks, Days, hrs, mins, sec
function getMs(timeArr = [0, 0, 0, 0, 0]) {
  if(timeArr.length < 5) return -1;
  return timeArr[0] * msPerWeek + timeArr[1] * msPerDay + timeArr[2] * msPerHour + timeArr[3] * msPerMinute + timeArr[4] * msPerSecond;
}