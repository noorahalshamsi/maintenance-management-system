// Equipment data generator for 2000 items
const fs = require('fs');

const sites = {
    mgs: { name: "MGS (Riyadh)", count: 500 },
    jafurah: { name: "Jafurah", count: 400 },
    "ras-tanura": { name: "Ras Tanura", count: 400 },
    zuluf: { name: "Zuluf", count: 350 },
    yanbu: { name: "Yanbu", count: 350 }
};

const equipmentTypes = [
    { type: "Heavy Machinery", names: ["Excavator CAT 320", "Bulldozer D8T", "Loader Volvo L120", "Grader CAT 140M", "Backhoe JCB 3CX"] },
    { type: "Lifting Equipment", names: ["Crane Liebherr LTM 1200", "Mobile Crane Tadano", "Overhead Crane 20T", "Gantry Crane 50T", "Tower Crane"] },
    { type: "Transport Vehicle", names: ["Dump Truck Volvo A40G", "Tipper Truck Scania", "Flatbed Truck MAN", "Water Tanker", "Fuel Truck"] },
    { type: "Drilling Equipment", names: ["Drilling Rig Atlas Copco", "Core Drill", "Rotary Drill", "Hammer Drill", "Auger Drill"] },
    { type: "Support Equipment", names: ["Compressor Ingersoll Rand", "Air Compressor Atlas Copco", "Generator Set", "Welding Machine Miller", "Pressure Washer Karcher"] },
    { type: "Power Equipment", names: ["Generator Caterpillar 500kW", "Generator Cummins 750kW", "UPS System", "Transformer 1000kVA", "Switchgear Panel"] },
    { type: "Material Handling", names: ["Forklift Toyota 8FD25", "Reach Truck", "Pallet Jack", "Conveyor System", "Stacker"] },
    { type: "Process Equipment", names: ["Pump Centrifugal 200HP", "Submersible Pump", "Vacuum Pump", "Heat Exchanger", "Mixing Tank"] },
    { type: "Specialized Equipment", names: ["Tank Cleaning Robot", "Inspection Camera", "Leak Detector", "Thickness Gauge", "Ultrasonic Tester"] },
    { type: "Safety Equipment", names: ["Fire Truck Rosenbauer", "Ambulance", "Emergency Response Vehicle", "Fire Suppression System", "Gas Detector"] },
    { type: "Fabrication Equipment", names: ["CNC Machine Haas VF-4", "Lathe Machine", "Milling Machine", "Plasma Cutter", "Press Brake"] },
    { type: "Cleaning Equipment", names: ["Street Sweeper", "Vacuum Truck", "High Pressure Washer", "Floor Scrubber", "Steam Cleaner"] }
];

const statuses = ["Operational", "Maintenance", "Out of Service"];
const statusWeights = [0.75, 0.20, 0.05]; // 75% operational, 20% maintenance, 5% out of service

const driverNames = [
    "Ahmed Al-Rashid", "Mohammed Al-Qahtani", "Khalid Al-Mutairi", "Fahad Al-Dosari", "Saeed Al-Ghamdi",
    "Abdullah Al-Harbi", "Omar Al-Shehri", "Hassan Al-Zahrani", "Tariq Al-Otaibi", "Nasser Al-Jaber",
    "Majed Al-Subai", "Yousef Al-Malki", "Ibrahim Al-Shamrani", "Faisal Al-Amri", "Bandar Al-Qahtani",
    "Saud Al-Harthy", "Turki Al-Saud", "Rashed Al-Dawsari", "Saleh Al-Shammari", "Mansour Al-Anzi",
    "Waleed Al-Otaibi", "Nawaf Al-Mutlaq", "Abdulaziz Al-Rajhi", "Sultan Al-Fahad", "Mishal Al-Saud"
];

const locations = {
    mgs: ["Site A - Block 1", "Site A - Block 2", "Site A - Block 3", "Site B - Tower Section", "Site C - Foundation", "Maintenance Bay 1", "Maintenance Bay 2", "Warehouse 1", "Warehouse 2"],
    jafurah: ["Well Pad 1", "Well Pad 2", "Well Pad 3", "Well Pad 4", "Well Pad 5", "Well Pad 6", "Well Pad 7", "Compressor Station 1", "Compressor Station 2", "Compressor Station 3", "Power Station 1", "Power Station 2"],
    "ras-tanura": ["Warehouse 1", "Warehouse 2", "Warehouse 3", "Warehouse 4", "Warehouse 5", "Pump House 1", "Pump House 2", "Pump House 3", "Fire Station 1", "Fire Station 2", "Maintenance Workshop"],
    zuluf: ["Platform A", "Platform B", "Platform C", "Offshore Rig 1", "Offshore Rig 2", "Supply Vessel", "Helipad Area", "Storage Facility", "Processing Unit 1", "Processing Unit 2"],
    yanbu: ["Refinery Unit 1", "Refinery Unit 2", "Refinery Unit 3", "Tank Farm A", "Tank Farm B", "Loading Bay 1", "Loading Bay 2", "Maintenance Shop 1", "Maintenance Shop 2", "Quality Control Lab"]
};

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function weightedRandomChoice(choices, weights) {
    const random = Math.random();
    let cumulative = 0;
    for (let i = 0; i < choices.length; i++) {
        cumulative += weights[i];
        if (random < cumulative) return choices[i];
    }
    return choices[0];
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function generateSerialNumber(type, year, index) {
    const prefix = type.split(' ')[0].substring(0, 3).toUpperCase();
    return `${prefix}-${year}-${String(index).padStart(4, '0')}`;
}

function generateEquipment(siteKey, siteName, index) {
    const equipType = randomChoice(equipmentTypes);
    const name = randomChoice(equipType.names);
    const status = weightedRandomChoice(statuses, statusWeights);
    const driver = randomChoice(driverNames);

    const lastMaintenanceDate = randomDate(new Date(2025, 10, 1), new Date(2026, 1, 8));
    const nextMaintenanceDate = new Date(lastMaintenanceDate);
    nextMaintenanceDate.setMonth(nextMaintenanceDate.getMonth() + 3);

    const workingHours = Math.floor(Math.random() * 8000) + 100;
    const year = 2022 + Math.floor(Math.random() * 3);

    const location = status === "Maintenance" ?
        (siteKey === "zuluf" || siteKey === "yanbu" ? randomChoice(locations[siteKey].filter(l => l.includes("Maintenance") || l.includes("Workshop") || l.includes("Shop"))) : "Maintenance Workshop") :
        randomChoice(locations[siteKey]);

    const notes = status === "Operational" ?
        "Regular maintenance completed. All systems functioning normally." :
        status === "Maintenance" ?
            "Scheduled maintenance in progress. Expected completion within 2 weeks." :
            "Major repair required. Awaiting parts delivery.";

    return {
        id: `${siteKey}-${String(index).padStart(3, '0')}`,
        name: name,
        type: equipType.type,
        status: status,
        driver: driver,
        lastMaintenance: formatDate(lastMaintenanceDate),
        nextMaintenance: formatDate(nextMaintenanceDate),
        location: location,
        serialNumber: generateSerialNumber(name, year, index),
        workingHours: `${workingHours.toLocaleString()} hrs`,
        notes: notes
    };
}

// Generate all equipment
const sitesData = {};
let globalIndex = 1;

for (const [siteKey, siteInfo] of Object.entries(sites)) {
    sitesData[siteKey] = {
        name: siteInfo.name,
        equipment: []
    };

    for (let i = 1; i <= siteInfo.count; i++) {
        sitesData[siteKey].equipment.push(generateEquipment(siteKey, siteInfo.name, i));
        globalIndex++;
    }
}

// Output the data
const output = `// Auto-generated equipment data - ${new Date().toISOString()}
const sitesData = ${JSON.stringify(sitesData, null, 4)};
`;

console.log(`Generated ${globalIndex - 1} equipment entries across ${Object.keys(sites).length} sites`);
console.log("\nBreakdown:");
for (const [siteKey, siteInfo] of Object.entries(sites)) {
    console.log(`  ${siteInfo.name}: ${siteInfo.count} items`);
}

// Write to file
fs.writeFileSync('equipment-data.js', output);
console.log("\nData written to equipment-data.js");
