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
  "Tight Nurses Dress": {
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