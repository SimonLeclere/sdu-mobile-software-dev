const carsData = [
    { id: 1, brandName: 'Audi', modelName: 'Sportback RS 5', fromDate: '2024-09-14', toDate: '2024-09-17', location: 'Paris', image: require('../../assets/vehiclesPictures/Audi RS5 Sportback.png'), type: 'Cars', tags: ['Sporty'], transmission: 'Automatic' },
    { id: 2, brandName: 'Audi', modelName: 'Cabriolet A5', fromDate: '2024-12-24', toDate: '2025-01-01', location: 'Odense', image: require('../../assets/vehiclesPictures/Audi A5 Cabriolet.png'), type: 'Cars', tags: ['Convertible', 'Elegant'], transmission: 'Automatic' },
];

async function getBookedCars() {
    // wait for 1 second to simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    return carsData;
}

export { getBookedCars };