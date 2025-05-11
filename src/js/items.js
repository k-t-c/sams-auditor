const ITEM_TYPES = [
  "Medical Kit",
  "Bandage",
  "Airbag Set",
  "Binder",
  "Blood Kit",
  "Car Battery",
  "Cash Envelope",
  "Catalytic Converter",
  "Checkbook",
  "Cleaning Kit",
  "Duffel Bag",
  "EMS Cap",
  "Evidence Box",
  "Fingerprint Kit",
  "Fire Extinguisher",
  "Flare",
  "Flashlight",
  "Knife",
  "Gas Can",
  "GPS Watch",
  "Gov Repair Kit",
  "Gov Tyre Mobility Kit",
  "Generic Drug A",
  "Generic Drug B",
  "Generic Drug C",
  "Generic Drug D",
  "MDT",
  "Motorcycle Battery",
  "Pack of Cigarettes",
  "Pack of Cigars",
  "Paper",
  "Prepaid Fuel Card",
  "Radio",
  "Radio Earpiece",
  "Repair",
  "SAMS Belt",
  "SAMS Boots",
  "SAMS Holster",
  "SAMS Pants",
  "SAMS Scrub Pants",
  "SAMS Scrub Top",
  "SAMS Skirt",
  "Sample Kit",
  "Saliva Swab",
  "Seatbelt Set",
  "Stethoscope",
  "TacMed Balaclava",
  "TacMed Cargo Pants",
  "TacMed First Responder Jacket",
  "TacMed Gaiter",
  "TacMed Pants",
  "TacMed T-Shirt",
  "TecMed Headset",
  "TecMed Vest",
  "Tactical Flashlight",
  "Traffic Cone",
  "Wheelchair",
];

const ITEM_DEFINITIONS = {
  "Medical Kit": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  Bandage: {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Airbag Set": {
    acceptableNumbers: {
      numAtOnce: 0,
      rateNum: 0,
      rateInterval: 0,
    },
  },
  Binder: {
    acceptableNumbers: {
      numAtOnce: 5,
      rateNum: 5,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Blood Kit": {
    acceptableNumbers: {
      numAtOnce: 2,
      rateNum: 2,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Car Battery": {
    acceptableNumbers: {
      numAtOnce: 0,
      rateNum: 0,
      rateInterval: 0,
    },
  },
  "Cash Envelope": {
    acceptableNumbers: {
      numAtOnce: 0,
      rateNum: 0,
      rateInterval: 0,
    },
  },
  "Catalytic Converter": {
    acceptableNumbers: {
      numAtOnce: 0,
      rateNum: 0,
      rateInterval: 0,
    },
  },
  Checkbook: {
    acceptableNumbers: {
      numAtOnce: 0,
      rateNum: 0,
      rateInterval: 0,
    },
  },
  "Cleaning Kit": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 3600000, // 1 hour
    },
  },
  "Duffel Bag": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "EMS Cap": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "Evidence Box": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Fingerprint Kit": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Fire Extinguisher": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  Flare: {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  Flashlight: {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  Knife: {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "Gas Can": {
    acceptableNumbers: {
      numAtOnce: 0,
      rateNum: 0,
      rateInterval: 0,
    },
  },
  "GPS Watch": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "Gov Repair Kit": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 2,
      rateInterval: 14400000, // 4 hours
    },
  },
  "Gov Tyre Mobility Kit": {
    acceptableNumbers: {
      numAtOnce: 4,
      rateNum: 4, // if they need more than 4 per 4 hours that means they blew up their ambo twice. wtf
      rateInterval: 14400000, // 4 hours
    },
  },
  "Generic Drug A": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Generic Drug B": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Generic Drug C": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Generic Drug D": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  MDT: {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "Motorcycle Battery": {
    acceptableNumbers: {
      numAtOnce: 0,
      rateNum: 0,
      rateInterval: 0,
    },
  },
  "Pack of Cigarettes": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 14400000, // 4 hours
    },
  },
  "Pack of Cigars": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 14400000, // 4 hours
    },
  },
  Paper: {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Prepaid Fuel Card": {
    acceptableNumbers: {
      numAtOnce: 0,
      rateNum: 0,
      rateInterval: 0,
    },
  },
  Radio: {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "Radio Earpiece": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  Repair: {
    acceptableNumbers: {
      numAtOnce: 3,
      rateNum: 3,
      rateInterval: 300000, // 5 minutes
    },
  },
  "SAMS Belt": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "SAMS Boots": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "SAMS Holster": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "SAMS Pants": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "SAMS Scrub Pants": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "SAMS Scrub Top": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "SAMS Skirt": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "Sample Kit": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Saliva Swab": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
  "Seatbelt Set": {
    acceptableNumbers: {
      numAtOnce: 0,
      rateNum: 0,
      rateInterval: 0,
    },
  },
  Stethoscope: {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "TacMed Balaclava": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "TacMed Cargo Pants": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "TacMed First Responder Jacket": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "TacMed Gaiter": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "TacMed Pants": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "TacMed T-Shirt": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "TecMed Headset": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "TecMed Vest": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "Tactical Flashlight": {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 1814400000, // 3 weeks
    },
  },
  "Traffic Cone": {
    acceptableNumbers: {
      numAtOnce: 0,
      rateNum: 0,
      rateInterval: 0,
    },
  },
  Wheelchair: {
    acceptableNumbers: {
      numAtOnce: 1,
      rateNum: 1,
      rateInterval: 300000, // 5 minutes
    },
  },
};
