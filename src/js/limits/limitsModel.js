const ITEM_DEFINITIONS = {
  "Medical Kit": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Bandage": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Airbag Set": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 Seconds",
    },
  },
  "Binder": {
    acceptableNumbers: {
      perSingleTransaction: 5,
      perTimeInterval: 5,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Blood Kit": {
    acceptableNumbers: {
      perSingleTransaction: 2,
      perTimeInterval: 2,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Car Battery": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 Seconds",
    },
  },
  "Cash Envelope": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 Seconds",
    },
  },
  "Catalytic Converter": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 Seconds",
    },
  },
  "Checkbook": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 Seconds",
    },
  },
  "Cleaning Kit": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 3600000,
      timeDescription: "1 Hours",
    },
  },
  "Duffel Bag": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "EMS Cap": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "Evidence Box": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Fingerprint Kit": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Fire Extinguisher": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Flare": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Flashlight": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "Knife": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "Gas Can": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 Seconds",
    },
  },
  "GPS Watch": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "Gov Repair Kit": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 2,
      timeInterval: 14400000,
      timeDescription: "4 Hours",
    },
  },
  "Gov Tyre Mobility Kit": {
    acceptableNumbers: {
      perSingleTransaction: 4,
      perTimeInterval: 4, // if they need more than 4 per 4 Hours that means they blew up their ambo twice. wtf
      timeInterval: 14400000,
      timeDescription: "4 Hours",
    },
  },
  "Generic Drug A": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Generic Drug B": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Generic Drug C": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Generic Drug D": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "MDT": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "Motorcycle Battery": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 Seconds",
    },
  },
  "Pack of Cigarettes": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 14400000,
      timeDescription: "4 Hours",
    },
  },
  "Pack of Cigars": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 14400000,
      timeDescription: "4 Hours",
    },
  },
  "Paper": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Prepaid Fuel Card": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 Seconds",
    },
  },
  "Radio": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "Radio Earpiece": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "Repair": {
    acceptableNumbers: {
      perSingleTransaction: 4,
      perTimeInterval: 4,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "SAMS Belt": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "SAMS Boots": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "SAMS Holster": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "SAMS Pants": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "SAMS Scrub pants": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "SAMS Scrub Top": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "SAMS Skirt": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "Sample Kit": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Saliva Swab": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
  "Seatbelt Set": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 Seconds",
    },
  },
  "Stethoscope": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "TacMed Balaclava": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "TacMed Cargo Pants": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "TacMed First Responder Jacket": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "TacMed Gaiter": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "TacMed Pants": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "TacMed T-Shirt": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "TecMed Headset": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "TecMed Vest": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "Tactical Flashlight": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 Weeks",
    },
  },
  "Traffic Cone": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 Seconds",
    },
  },
  "Wheelchair": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 Minutes",
    },
  },
};

const msPerWeek = 604800000;
const msPerDay = 86400000;
const msPerHour = 3600000;
const msPerMinute = 60000;
const msPerSecond = 1000;

function convertMsToString(timeInterval = 0) {
  if (timeInterval < 1000) {
    // TODO: error handling
    return false;
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