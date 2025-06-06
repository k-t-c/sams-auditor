const msPerWeek = 604800000;
const msPerDay = 86400000;
const msPerHour = 3600000;
const msPerMinute = 60000;
const msPerSecond = 1000;

function convertMsToString(timeInterval = 0) {
  if (timeInterval < 1000) {
    // TODO: error handling
    timeInterval = Math.round(timeInterval / 1000);
  }
  if (timeInterval <= 0) {
    return "0 Seconds";
  }
  let ms = timeInterval;

  const weeks = Math.floor(ms / msPerWeek);
  ms %= msPerWeek;
  const days = Math.floor(ms / msPerDay);
  ms %= msPerDay;
  const hours = Math.floor(ms / msPerHour);
  ms %= msPerHour;
  const minutes = Math.floor(ms / msPerMinute);
  ms %= msPerMinute;
  const seconds = Math.floor(ms / msPerSecond);

  if (weeks > 0) return `${weeks} Weeks`;
  if (days > 0) return `${days} Days`;
  if (hours > 0) return `${hours} Hours`;
  if (minutes > 0) return `${minutes} Minutes`;
  if (seconds > 0) return `${seconds} Seconds`;
}

// Weeks, Days, hrs, mins, sec
function getMs(timeArr = [0, 0, 0, 0, 0]) {
  if (timeArr.length < 5) return -1;
  return (
    timeArr[0] * msPerWeek +
    timeArr[1] * msPerDay +
    timeArr[2] * msPerHour +
    timeArr[3] * msPerMinute +
    timeArr[4] * msPerSecond
  );
}

function getMsFromString(timeString) {
  let [value, time] = timeString.split(" ");
  value = parseInt(value);
  let result = 0;
  switch (time) {
    case "Weeks":
      result = value * msPerWeek;
      break;
    case "Days":
      result = value * msPerDay;
      break;
    case "Hours":
      result = value * msPerHour;
      break;
    case "Minutes":
      result = value * msPerMinute;
      break;
    case "Seconds":
      result = value * msPerSecond;
      break;
    default:
      // TODO: error handling
      break;
  }
  return result;
}

function limitsSetItemLimits(itemName = "", itemObj = null) {
  let itemDefinition = window.itemDefinitions[itemName] || null;
  if (!itemName || !itemObj) {
    // TODO: error handling
    return false;
  }
  if (itemDefinition) {
    if (itemObj) {
      window.itemDefinitions[itemName] = itemObj;
      limitsUpdated();
      return true;
    }
  }
  // TODO: error handling
  return false;
}

function limitsGetSingleTransaction(itemName) {
  return itemDefinitions[itemName]?.acceptableNumbers?.perSingleTransaction || null;
}

function limitsSetSingleTransaction(itemName, newLimit) {
  if (
    window.itemDefinitions &&
    window.itemDefinitions[itemName] &&
    window.itemDefinitions[itemName].acceptableNumbers
  ) {
    window.itemDefinitions[itemName].acceptableNumbers.perSingleTransaction = newLimit;
    limitsUpdated();
    return true;
  } else {
    // TODO: error handling
    return null;
  }
}
function limitsGetPerTimeInterval(itemName) {
  return itemDefinitions[itemName]?.acceptableNumbers?.perTimeInterval || null;
}

function limitsSetPerTimeInterval(itemName, newLimit) {
  if (
    window.itemDefinitions &&
    window.itemDefinitions[itemName] &&
    window.itemDefinitions[itemName].acceptableNumbers
  ) {
    window.itemDefinitions[itemName].acceptableNumbers.perTimeInterval = newLimit;
    limitsUpdated();
    return true;
  } else {
    // TODO: error handling
    return null;
  }
}

function limitsGetTimeInterval(itemName) {
  return itemDefinitions[itemName]?.acceptableNumbers?.timeInterval || null;
}

function limitsSetTimeInterval(itemName, newLimit) {
  if (
    window.itemDefinitions &&
    window.itemDefinitions[itemName] &&
    window.itemDefinitions[itemName].acceptableNumbers
  ) {
    window.itemDefinitions[itemName].acceptableNumbers.timeInterval = newLimit;
    window.itemDefinitions[itemName].acceptableNumbers.timeDescription =
      convertMsToString(newLimit);
    limitsUpdated();
    return true;
  } else {
    // TODO: error handling
    return null;
  }
}

function limitsResetAllToDefault() {
  window.itemDefinitions = JSON.parse(JSON.stringify(ITEM_DEFINITIONS));
  limitsUpdated();
}

function limitsResetItemToDefault(itemName) {
  window.itemDefinitions[itemName] = JSON.parse(JSON.stringify(ITEM_DEFINITIONS[itemName]));
  limitsUpdated();
}

function limitsItemIsDefault(itemName) {
  item = itemDefinitions[itemName].acceptableNumbers;
  itemDefault = ITEM_DEFINITIONS[itemName].acceptableNumbers;
  for (const property of Object.keys(item)) {
    if (item.hasOwnProperty(property)){
      if(item[property] !== itemDefault[property]) {
        return false;
      }
    }
  }
  return true;
}

function getItemDefinitions() {
  return (
    JSON.parse(localStorage.getItem("itemDefinitions")) ||
    JSON.parse(JSON.stringify(ITEM_DEFINITIONS))
  );
}

window.itemDefinitions = getItemDefinitions();