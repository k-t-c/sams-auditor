const ITEM_DEFINITIONS = {
  "Medical Kit": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Bandage": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Airbag Set": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 seconds",
    },
  },
  "Binder": {
    acceptableNumbers: {
      perSingleTransaction: 5,
      perTimeInterval: 5,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Blood Kit": {
    acceptableNumbers: {
      perSingleTransaction: 2,
      perTimeInterval: 2,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Car Battery": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 seconds",
    },
  },
  "Cash Envelope": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 seconds",
    },
  },
  "Catalytic Converter": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 seconds",
    },
  },
  "Checkbook": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 seconds",
    },
  },
  "Cleaning Kit": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 3600000,
      timeDescription: "1 hour",
    },
  },
  "Duffel Bag": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "EMS Cap": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "Evidence Box": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Fingerprint Kit": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Fire Extinguisher": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Flare": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Flashlight": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "Knife": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "Gas Can": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 seconds",
    },
  },
  "GPS Watch": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "Gov Repair Kit": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 2,
      timeInterval: 14400000,
      timeDescription: "4 hours",
    },
  },
  "Gov Tyre Mobility Kit": {
    acceptableNumbers: {
      perSingleTransaction: 4,
      perTimeInterval: 4, // if they need more than 4 per 4 hours that means they blew up their ambo twice. wtf
      timeInterval: 14400000,
      timeDescription: "4 hours",
    },
  },
  "Generic Drug A": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Generic Drug B": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Generic Drug C": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Generic Drug D": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "MDT": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "Motorcycle Battery": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 seconds",
    },
  },
  "Pack of Cigarettes": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 14400000,
      timeDescription: "4 hours",
    },
  },
  "Pack of Cigars": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 14400000,
      timeDescription: "4 hours",
    },
  },
  "Paper": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Prepaid Fuel Card": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 seconds",
    },
  },
  "Radio": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "Radio Earpiece": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "Repair": {
    acceptableNumbers: {
      perSingleTransaction: 4,
      perTimeInterval: 4,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "SAMS Belt": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "SAMS Boots": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "SAMS Holster": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "SAMS Pants": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "SAMS Scrub Pants": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "SAMS Scrub Top": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "SAMS Skirt": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "Sample Kit": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Saliva Swab": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
  "Seatbelt Set": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 seconds",
    },
  },
  "Stethoscope": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "TacMed Balaclava": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "TacMed Cargo Pants": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "TacMed First Responder Jacket": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "TacMed Gaiter": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "TacMed Pants": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "TacMed T-Shirt": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "TecMed Headset": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "TecMed Vest": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "Tactical Flashlight": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 1814400000,
      timeDescription: "3 weeks",
    },
  },
  "Traffic Cone": {
    acceptableNumbers: {
      perSingleTransaction: 0,
      perTimeInterval: 0,
      timeInterval: 0,
      timeDescription: "0 seconds",
    },
  },
  "Wheelchair": {
    acceptableNumbers: {
      perSingleTransaction: 1,
      perTimeInterval: 1,
      timeInterval: 300000,
      timeDescription: "5 minutes",
    },
  },
};

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

  if (weeks > 0) outputString += `${weeks} weeks `;
  if (days > 0) outputString += `${days} days `;
  if (hours > 0) outputString += `${hours} hours `;
  if (minutes > 0) outputString += `${minutes} minutes `;
  if (seconds > 0) outputString += `${seconds} seconds `;

  return outputString.trim();
}

// weeks, days, hrs, mins, sec
function getMs(timeArr = [0, 0, 0, 0, 0]) {
  if(timeArr.length < 5) return -1;
  return timeArr[0] * msPerWeek + timeArr[1] * msPerDay + timeArr[2] * msPerHour + timeArr[3] * msPerMinute + timeArr[4] * msPerSecond;
}