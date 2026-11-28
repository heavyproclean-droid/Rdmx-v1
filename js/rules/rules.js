// rules.js

export const rules = [

  // =========================
  // WON'T START
  // =========================

  {
    symptom: "noStart",
    weights: {
      fuelDelivery: 10,
      cloggedCarb: 8,
      ignitionFailure: 8,
      lowCompression: 6
    }
  },

  // =========================
  // HARD STARTING
  // =========================

  {
    symptom: "hardStart",
    weights: {
      carbAdjustment: 10,
      cloggedCarb: 8,
      crankcaseLeak: 6,
      lowCompression: 5
    }
  },

  // =========================
  // STARTS THEN DIES
  // =========================

  {
    symptom: "startsThenDies",
    weights: {
      fuelDelivery: 12,
      impulseFailure: 10,
      cloggedCarb: 8,
      fuelContamination: 7
    }
  },

  // =========================
  // NO IDLE
  // =========================

  {
    symptom: "noIdle",
    weights: {
      carbAdjustment: 12,
      cloggedCarb: 10,
      crankcaseLeak: 9,
      lowCompression: 4
    }
  },

  // =========================
  // BOGS UNDER THROTTLE
  // =========================

  {
    symptom: "bogUnderThrottle",
    weights: {
      cloggedCarb: 12,
      fuelDelivery: 10,
      pluggedExhaust: 8,
      carbAdjustment: 6
    }
  },

  // =========================
  // LOW POWER
  // =========================

  {
    symptom: "lowPower",
    weights: {
      lowCompression: 12,
      pluggedExhaust: 10,
      fuelDelivery: 8,
      crankcaseLeak: 7
    }
  },

  // =========================
  // EXCESSIVE SMOKE
  // =========================

  {
    symptom: "excessiveSmoke",
    weights: {
      floodedEngine: 12,
      carbAdjustment: 8,
      cloggedCarb: 5
    }
  },

  // =========================
  // NO SPARK
  // =========================

  {
    symptom: "noSpark",
    weights: {
      ignitionFailure: 25
    }
  },

  // =========================
  // WET PLUG
  // =========================

  {
    symptom: "wetPlug",
    weights: {
      floodedEngine: 15,
      ignitionFailure: 10
    }
  },
{
  symptom: "runsOnlyOnChoke",

  weights: {
    cloggedCarb: 20,
    fuelDelivery: 18,
    crankcaseLeak: 15,
    impulseFailure: 12,
    carbAdjustment: 10
  }
},

  // =========================
  // DRY PLUG
  // =========================

  {
    symptom: "dryPlug",
    weights: {
      fuelDelivery: 15,
      cloggedCarb: 12,
      impulseFailure: 8
    }
  }
];
