export interface Bike {
  timestamp: number; // Unix timestamp of when the bike was added to the database
  id: string; // Unique identifier for the bike
  make: string; // Manufacturer of the bike
  model: string; // Model of the bike
  type: BikeType | string; // Type of the bike (e.g., road, mountain, hybrid)
  frameSize: FrameSize | string; // Size of the bike frame
  wheelSize: number; // Size of the wheels in inches
  color: string; // Color of the bike
  material: string; // Material of the bike frame (e.g., aluminum, carbon fiber)
  brakeType: BrakeType | string; // Type of braking system (e.g., disc, rim)
  suspension: SuspensionType | string; // Type of suspension (e.g., front, full)
  gears: number; // Number of gears
  weight: number; // Weight of the bike in kilograms
  dimensions: Dimensions | string; // Physical dimensions of the bike
  price: number; // Price of the bike
  stock: number; // Whether the bike is in stock
  description: string; // A short description of the bike
  features: string[]; // Additional features of the bike
  warrantyPeriod: string; // Warranty period for the bike
  image: string; // URL to an image of the bike
}

// Supporting enums and interfaces
enum BikeType {
  Road = 'Road',
  Mountain = 'Mountain',
  Hybrid = 'Hybrid',
  BMX = 'BMX',
  Electric = 'Electric',
  // ... other types
}

enum FrameSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  // ... additional sizes if needed
}

enum BrakeType {
  Disc,
  Rim,
  Drum,
  // ... other types
}

enum SuspensionType {
  None,
  Front,
  Full,
  // ... other types
}

interface Dimensions {
  length: number; // Length of the bike in centimeters
  width: number; // Width of the bike in centimeters
  height: number; // Height of the bike in centimeters
}