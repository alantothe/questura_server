import Location from "../models/Locations";
import locationData from "../data/location.json";
import db from "../mongo/connection";

async function seedDatabase() {
  try {
    await new Promise<void>((resolve) => {
      db.once("connected", () => {
        console.log("Connected to the database for seeding");
        resolve();
      });
    });

    // Insert location data into the database
    const existingLocation = await Location.findOne({ 
      country: locationData.country
    });

    if (!existingLocation) {
      const newLocation = new Location(locationData);
      await newLocation.save();
      console.log(`Created location: ${locationData.country}`);
    } else {
      console.log(`Location already exists: ${locationData.country}`);
    }
    console.log("Seeding completed");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection when done
    await db.close();
  }
}

seedDatabase();