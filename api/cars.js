const carsData = [
    { id: 1, brandName: 'Audi', modelName: 'Sportback RS 5', price: 1400, image: require('../assets/vehiclesPictures/Audi RS5 Sportback.png'), type: 'Cars', tags: ['Sporty'], transmission: 'Automatic' },
    { id: 2, brandName: 'Audi', modelName: 'Cabriolet A5', price: 1700, image: require('../assets/vehiclesPictures/Audi A5 Cabriolet.png'), type: 'Cars', tags: ['Convertible', 'Elegant'], transmission: 'Automatic' },
    { id: 3, brandName: 'Lexus', modelName: 'ES Hybrid', price: 1500, image: require('../assets/vehiclesPictures/Lexus ES hybrid.png'), type: 'Cars', tags: ['Hybrid', 'Comfortable'], transmission: 'Automatic' },
    { id: 4, brandName: 'Lexus', modelName: 'LS F Sport', price: 2000, image: require('../assets/vehiclesPictures/Lexus LS F Sport.png'), type: 'Cars', tags: ['Sporty', 'Luxury'], transmission: 'Automatic' },
    { id: 5, brandName: 'Tesla', modelName: 'Model 3', price: 1200, image: require('../assets/vehiclesPictures/Tesla model 3.png'), type: 'Cars', tags: ['Electric', 'Autonomous'], transmission: 'Automatic' },
    { id: 6, brandName: 'Toyota', modelName: 'Prius', price: 1000, image: require('../assets/vehiclesPictures/Toyota prius.png'), type: 'Cars', tags: ['Electric', 'Economical'], transmission: 'Automatic' },
    { id: 7, brandName: 'BMW', modelName: 'X5', price: 1800, image: require('../assets/vehiclesPictures/BMW X5.png'), type: 'SUVs', tags: ['Luxury', 'Spacious'], transmission: 'Automatic' },
    { id: 8, brandName: 'Ford', modelName: 'Mustang', price: 1600, image: require('../assets/vehiclesPictures/Ford mustang.png'), type: 'Cars', tags: ['Fast', 'Classic'], transmission: 'Manual' },
    { id: 9, brandName: 'Chevrolet', modelName: 'Tahoe', price: 1900, image: require('../assets/vehiclesPictures/Chevrolet Tahoe.png'), type: 'SUVs', tags: ['Large', 'Comfortable'], transmission: 'Automatic' },
    { id: 10, brandName: 'Nissan', modelName: 'Leaf', price: 900, image: require('../assets/vehiclesPictures/Nissan Leaf.png'), type: 'Cars', tags: ['Electric', 'Compact'], transmission: 'Automatic' },
    { id: 11, brandName: 'Chevrolet', modelName: 'Silverado', price: 2200, image: require('../assets/vehiclesPictures/Chevrolet Silverado.png'), type: 'Pickups', tags: ['Durable', 'Spacious'], transmission: 'Automatic' },
    { id: 12, brandName: 'Jeep', modelName: 'Wrangler', price: 2000, image: require('../assets/vehiclesPictures/Jeep Wrangler.png'), type: 'Utility', tags: ['Off-Road', 'Rugged'], transmission: 'Manual' },
    { id: 13, brandName: 'Mercedes-Benz', modelName: 'Sprinter Van', price: 2500, image: require('../assets/vehiclesPictures/Mercedes-Benz Sprinter.png'), type: 'Minibuses', tags: ['Versatile', 'Spacious'], transmission: 'Automatic' },
    { id: 14, brandName: 'Dodge', modelName: 'Ram 1500', price: 2300, image: require('../assets/vehiclesPictures/Dodge Ram 1500.png'), type: 'Pickups', tags: ['Powerful', 'Durable'], transmission: 'Automatic' },
    { id: 15, brandName: 'Harley-Davidson', modelName: 'Iron 883', price: 1100, image: require('../assets/vehiclesPictures/Harley-Davidson Iron 883.png'), type: 'Motorcycles', tags: ['Classic', 'Stylish'], transmission: 'Manual' },
    { id: 16, brandName: 'Yamaha', modelName: 'MT-07', price: 1200, image: require('../assets/vehiclesPictures/Yamaha MT-07.png'), type: 'Motorcycles', tags: ['Sporty', 'Agile'], transmission: 'Manual' },
    { id: 17, brandName: 'Honda', modelName: 'CR-V', price: 1700, image: require('../assets/vehiclesPictures/Honda CR-V.png'), type: 'SUVs', tags: ['Comfortable', 'Reliable'], transmission: 'Automatic' },
    { id: 18, brandName: 'Subaru', modelName: 'Outback', price: 1800, image: require('../assets/vehiclesPictures/Subaru Outback.png'), type: 'SUVs', tags: ['Adventurous', 'Spacious'], transmission: 'Automatic' },
];


async function getCars() {

    // wait for 1 second to simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    return carsData;
}

async function getCarById(id) {    

    // wait for 1 second to simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    return carsData.find(car => car.id === id);
}

export { getCars, getCarById };