const carsData = [
    { 
        id: 1, 
        brandName: 'Audi', 
        modelName: 'Sportback RS 5', 
        fromDate: '2024-09-25', 
        toDate: '2024-10-01', 
        location: 'Paris', 
        exactAddress: '98 Av. Charles de Gaulle, 75013 Paris, France', 
        pickUpTime: '14:30', 
        dropOffTime: '16:30', 
        image: require('../../assets/vehiclesPictures/Audi RS5 Sportback.png'), 
        type: 'Cars', 
        tags: ['Sporty'], 
        transmission: 'Automatic' 
    },
    { 
        id: 2, 
        brandName: 'Audi', 
        modelName: 'Cabriolet A5', 
        fromDate: '2024-12-24', 
        toDate: '2025-01-01', 
        location: 'Odense',  
        exactAddress: 'Munkerisvej 14, 5230 Odense, Denmark', 
        pickUpTime: '10:30', 
        dropOffTime: '13:50', 
        image: require('../../assets/vehiclesPictures/Audi A5 Cabriolet.png'), 
        type: 'Cars', 
        tags: ['Convertible', 'Elegant'], 
        transmission: 'Automatic' 
    },
    { 
        id: 3, 
        brandName: 'Lexus', 
        modelName: 'ES Hybrid', 
        fromDate: '2022-07-10', 
        toDate: '2022-07-20', 
        location: 'Berlin', 
        exactAddress: 'Kudamm 175, 10707 Berlin, Germany', 
        pickUpTime: '11:00', 
        dropOffTime: '14:00', 
        image: require('../../assets/vehiclesPictures/Lexus ES hybrid.png'), 
        type: 'Cars', 
        tags: ['Hybrid', 'Comfortable'], 
        transmission: 'Automatic' 
    },
    { 
        id: 4, 
        brandName: 'Lexus', 
        modelName: 'LS F Sport', 
        fromDate: '2021-03-12', 
        toDate: '2021-03-15', 
        location: 'New York', 
        exactAddress: '5th Ave, 10118 New York, USA', 
        pickUpTime: '09:00', 
        dropOffTime: '17:00', 
        image: require('../../assets/vehiclesPictures/Lexus LS F Sport.png'), 
        type: 'Cars', 
        tags: ['Sporty', 'Luxury'], 
        transmission: 'Automatic' 
    },
    { 
        id: 5, 
        brandName: 'Tesla', 
        modelName: 'Model 3', 
        fromDate: '2025-05-02', 
        toDate: '2025-05-06', 
        location: 'San Francisco', 
        exactAddress: '300 Howard St, San Francisco, CA, USA', 
        pickUpTime: '12:00', 
        dropOffTime: '15:30', 
        image: require('../../assets/vehiclesPictures/Tesla model 3.png'), 
        type: 'Cars', 
        tags: ['Electric', 'Autonomous'], 
        transmission: 'Automatic' 
    },
    { 
        id: 6, 
        brandName: 'Toyota', 
        modelName: 'Prius', 
        fromDate: '2020-08-15', 
        toDate: '2020-08-18', 
        location: 'Tokyo', 
        exactAddress: '1-1 Oshiage, Sumida City, Tokyo 131-0045, Japan', 
        pickUpTime: '08:45', 
        dropOffTime: '13:15', 
        image: require('../../assets/vehiclesPictures/Toyota prius.png'), 
        type: 'Cars', 
        tags: ['Electric', 'Economical'], 
        transmission: 'Automatic' 
    },
    { 
        id: 7, 
        brandName: 'BMW', 
        modelName: 'X5', 
        fromDate: '2024-11-22', 
        toDate: '2024-11-25', 
        location: 'London', 
        exactAddress: '221B Baker St, Marylebone, London NW1 6XE, UK', 
        pickUpTime: '10:00', 
        dropOffTime: '12:00', 
        image: require('../../assets/vehiclesPictures/BMW X5.png'), 
        type: 'SUVs', 
        tags: ['Luxury', 'Spacious'], 
        transmission: 'Automatic' 
    }
];

async function getBookedCars() {
    // wait for 1 second to simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    return carsData;
}

export { getBookedCars };