import TourPackage from '../models/Package';
import tourData from '../data/master.json'; 

async function seedDatabase() {
  try {
    // Loop through the data if it's an array
    const newTourPackage = new TourPackage(tourData);
    await newTourPackage.save();
    console.log('Tour package seeded successfully');
  } catch (error) {
    console.error('Error seeding tour package:', error);
  }
}

seedDatabase();