// procedures.js

export const procedures = {

  fuelDelivery: {
    title: "Fuel System Inspection and Repair",

    tools: [
      "Fuel line pliers",
      "Flashlight",
      "Replacement fuel lines",
      "Replacement fuel filter"
    ],

    safety: [
      "Work in a well-ventilated area.",
      "Keep fuel away from ignition sources."
    ],

    steps: [
      "Drain old fuel from the tank.",
      "Inspect fuel lines for cracks, splits, or deterioration.",
      "Inspect the fuel filter for contamination.",
      "Check that the tank vent is clear and functioning properly.",
      "Ensure fuel flows freely through the fuel line.",
      "Replace damaged fuel system components.",
      "Refill with fresh properly mixed fuel.",
      "Test engine operation."
    ]
  },

  cloggedCarb: {
    title: "Carburetor Cleaning and Inspection",

    tools: [
      "Screwdrivers",
      "Carburetor cleaner",
      "Compressed air",
      "Carburetor rebuild kit"
    ],

    safety: [
      "Wear eye protection.",
      "Avoid inhaling carburetor cleaner."
    ],

    steps: [
      "Remove the air filter cover.",
      "Remove the carburetor from the engine.",
      "Inspect the fuel inlet screen.",
      "Inspect metering and pump diaphragms.",
      "Clean passages with approved carburetor cleaner.",
      "Blow passages clean with compressed air.",
      "Install rebuild kit components if necessary.",
      "Reassemble carburetor.",
      "Reinstall on engine.",
      "Reset carburetor to baseline settings.",
      "Start engine and perform final tuning."
    ]
  },

  carbAdjustment: {
    title: "Carburetor Adjustment",

    tools: [
      "Proper carburetor adjustment tool",
      "Tachometer (optional)"
    ],

    safety: [
      "Keep clear of moving cutting attachments."
    ],

    steps: [
      "Verify fresh fuel is installed.",
      "Inspect air filter condition.",
      "Reset carburetor to known baseline settings.",
      "For unknown settings, turn the inner idle adjustment screw counterclockwise until it clicks.",
      "Turn the screw clockwise 10 turns from thread engagement.",
      "Start the engine.",
      "Allow engine to reach operating temperature.",
      "Adjust low-speed circuit for smooth idle.",
      "Adjust for crisp throttle response.",
      "Adjust high-speed circuit if required.",
      "Verify engine accelerates cleanly and idles properly."
    ]
  },

  floodedEngine: {
    title: "Flooded Engine Recovery",

    tools: [
      "Spark plug wrench",
      "Clean rag"
    ],

    safety: [
      "Disable ignition if performing extensive inspection."
    ],

    steps: [
      "Remove spark plug.",
      "Inspect spark plug condition.",
      "Dry or replace spark plug.",
      "Pull starter rope several times to clear excess fuel.",
      "Install spark plug.",
      "Follow proper starting procedure.",
      "Attempt restart."
    ]
  },

  ignitionFailure: {
    title: "Ignition System Diagnosis",

    tools: [
      "Spark tester",
      "Insulated hand tools"
    ],

    safety: [
      "Keep fuel vapors away from sparks.",
      "Use an approved spark tester and follow its instructions."
    ],

    steps: [
      "Inspect the spark plug, lead, and ignition connections.",
      "Test for spark with an approved spark tester.",
      "If spark is absent, isolate the stop-switch circuit using the manufacturer's procedure.",
      "Inspect the ignition module, flywheel key, and coil air gap.",
      "Repair or replace failed components and retest."
    ]
  },

  lowCompression: {
    title: "Low Compression Diagnosis",
    tools: ["Compression gauge", "Leakdown tester", "Basic hand tools"],
    safety: [
      "Disable ignition before testing.",
      "Allow a hot engine to cool before disassembly."
    ],
    steps: [
      "Verify the compression gauge seals correctly in the spark plug opening.",
      "Test compression using the equipment manufacturer's procedure.",
      "If compression is low, inspect the piston, cylinder, and rings.",
      "Perform a leakdown test to locate leakage if needed.",
      "Repair damaged components and retest compression."
    ]
  },

  crankcaseLeak: {
    title: "Crankcase Leak Inspection",
    tools: ["Pressure and vacuum tester", "Approved block-off plugs", "Basic hand tools"],
    safety: [
      "Use only the test pressure specified by the equipment manufacturer.",
      "Keep fuel away from ignition sources."
    ],
    steps: [
      "Inspect crank seals, intake boot, gaskets, and impulse line.",
      "Seal the intake and exhaust using approved test fittings.",
      "Pressure- and vacuum-test the crankcase to the manufacturer's specifications.",
      "Locate leaks with an approved method and replace failed seals or gaskets.",
      "Repeat the test before returning the equipment to service."
    ]
  },

  pluggedExhaust: {
    title: "Exhaust Restriction Inspection",
    tools: ["Eye protection", "Basic hand tools", "Replacement spark-arrestor screen"],
    safety: [
      "Allow the muffler to cool completely before inspection.",
      "Follow local rules for spark-arrestor service."
    ],
    steps: [
      "Remove the muffler cover after the engine has cooled.",
      "Inspect the spark-arrestor screen and exhaust outlet for carbon buildup.",
      "Clean or replace the screen according to manufacturer instructions.",
      "Inspect the muffler for damage and reinstall all guards.",
      "Test engine operation."
    ]
  },

  impulseFailure: {
    title: "Carburetor Impulse System Inspection",
    tools: ["Flashlight", "Basic hand tools", "Manufacturer service information"],
    safety: ["Work in a ventilated area with the engine off and cool."],
    steps: [
      "Inspect the impulse line and connection points for cracks or disconnection.",
      "Inspect the impulse passage and associated gaskets for blockage or damage.",
      "Check for a pulse signal using the manufacturer's test procedure.",
      "Repair the line, passage, or sealing surfaces and verify fuel pump operation."
    ]
  },

  fuelContamination: {
    title: "Fuel Quality and Contamination Check",
    tools: ["Approved fuel container", "Fresh manufacturer-approved fuel mixture"],
    safety: [
      "Drain fuel into an approved container.",
      "Keep fuel away from ignition sources and dispose of it properly."
    ],
    steps: [
      "Check the fuel age and confirm the specified oil-to-fuel mixture.",
      "Inspect drained fuel for water, debris, or separation.",
      "Drain contaminated fuel from the tank and carburetor as directed by the manufacturer.",
      "Inspect and clean the tank and replace a contaminated fuel filter.",
      "Refill with fresh approved fuel and test operation."
    ]
  }
};