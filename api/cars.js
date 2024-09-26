const carsData = [
    {
      id: 1,
      brandName: "Audi",
      modelName: "Sportback RS 5",
      shops: [1, 2],
      price: 1400,
      image: require("../assets/vehiclesPictures/Audi RS5 Sportback.png"),
      type: "Cars",
      tags: [
        "Sporty"
      ],
      transmission: "Automatic",
      fuelType: "Gasoline",
      seatingCapacity: 5,
    },
    {
      id: 2,
      brandName: "Audi",
      modelName: "Cabriolet A5",
      shops: [1, 3],
      price: 1700,
      image: require("../assets/vehiclesPictures/Audi A5 Cabriolet.png"),
      type: "Cars",
      tags: [
        "Convertible",
        "Elegant"
      ],
      transmission: "Automatic",
      fuelType: "Gasoline",
      seatingCapacity: 4,
    },
    {
      id: 3,
      brandName: "Lexus",
      modelName: "ES Hybrid",
      shops: [2, 4],
      price: 1500,
      image: require("../assets/vehiclesPictures/Lexus ES hybrid.png"),
      type: "Cars",
      tags: [
        "Hybrid",
        "Comfortable"
      ],
      transmission: "Automatic",
      fuelType: "Hybrid",
      seatingCapacity: 5,
    },
    {
      id: 4,
      brandName: "Lexus",
      modelName: "LS F Sport",
      shops: [3, 5],
      price: 2000,
      image: require("../assets/vehiclesPictures/Lexus LS F Sport.png"),
      type: "Cars",
      tags: [
        "Sporty",
        "Luxury"
      ],
      transmission: "Automatic",
      fuelType: "Gasoline",
      seatingCapacity: 5,
    },
    {
      id: 5,
      brandName: "Tesla",
      modelName: "Model 3",
      shops: [4, 6],
      price: 1200,
      image: require("../assets/vehiclesPictures/Tesla model 3.png"),
      type: "Cars",
      tags: [
        "Electric",
        "Autonomous"
      ],
      transmission: "Automatic",
      fuelType: "Electric",
      seatingCapacity: 5,
    },
    {
      id: 6,
      brandName: "Toyota",
      modelName: "Prius",
      shops: [5, 1],
      price: 1000,
      image: require("../assets/vehiclesPictures/Toyota prius.png"),
      type: "Cars",
      tags: [
        "Electric",
        "Economical"
      ],
      transmission: "Automatic",
      fuelType: "Hybrid",
      seatingCapacity: 5,
    },
    {
      id: 7,
      brandName: "BMW",
      modelName: "X5",
      shops: [6, 2],
      price: 1800,
      image: require("../assets/vehiclesPictures/BMW X5.png"),
      type: "SUVs",
      tags: [
        "Luxury",
        "Spacious"
      ],
      transmission: "Automatic",
      fuelType: "Gasoline",
      seatingCapacity: 5,
    },
    {
      id: 8,
      brandName: "Ford",
      modelName: "Mustang",
      shops: [1, 3],
      price: 1600,
      image: require("../assets/vehiclesPictures/Ford mustang.png"),
      type: "Cars",
      tags: [
        "Fast",
        "Classic"
      ],
      transmission: "Manual",
      fuelType: "Gasoline",
      seatingCapacity: 4,
    },
    {
      id: 9,
      brandName: "Chevrolet",
      modelName: "Tahoe",
      shops: [2, 4],
      price: 1900,
      image: require("../assets/vehiclesPictures/Chevrolet Tahoe.png"),
      type: "SUVs",
      tags: [
        "Large",
        "Comfortable"
      ],
      transmission: "Automatic",
      fuelType: "Gasoline",
      seatingCapacity: 7,
    },
    {
      id: 10,
      brandName: "Nissan",
      modelName: "Leaf",
      shops: [3, 5],
      price: 900,
      image: require("../assets/vehiclesPictures/Nissan Leaf.png"),
      type: "Cars",
      tags: [
        "Electric",
        "Compact"
      ],
      transmission: "Automatic",
      fuelType: "Electric",
      seatingCapacity: 5,
    },
    {
      id: 11,
      brandName: "Chevrolet",
      modelName: "Silverado",
      shops: [4, 6],
      price: 2200,
      image: require("../assets/vehiclesPictures/Chevrolet Silverado.png"),
      type: "Pickups",
      tags: [
        "Durable",
        "Spacious"
      ],
      transmission: "Automatic",
      fuelType: "Gasoline",
      seatingCapacity: 5,
    },
    {
      id: 12,
      brandName: "Jeep",
      modelName: "Wrangler",
      shops: [5, 1],
      price: 2000,
      image: require("../assets/vehiclesPictures/Jeep Wrangler.png"),
      type: "Utility",
      tags: [
        "Off-Road",
        "Rugged"
      ],
      transmission: "Manual",
      fuelType: "Gasoline",
      seatingCapacity: 4,
    },
    {
      id: 13,
      brandName: "Mercedes-Benz",
      modelName: "Sprinter Van",
      shops: [6, 2],
      price: 2500,
      image: require("../assets/vehiclesPictures/Mercedes-Benz Sprinter.png"),
      type: "Minibuses",
      tags: [
        "Versatile",
        "Spacious"
      ],
      transmission: "Automatic",
      fuelType: "Diesel",
      seatingCapacity: 12,
    },
    {
      id: 14,
      brandName: "Dodge",
      modelName: "Ram 1500",
      shops: [1, 3],
      price: 2300,
      image: require("../assets/vehiclesPictures/Dodge Ram 1500.png"),
      type: "Pickups",
      tags: [
        "Powerful",
        "Durable"
      ],
      transmission: "Automatic",
      fuelType: "Gasoline",
      seatingCapacity: 5,
    },
    {
      id: 15,
      brandName: "Harley-Davidson",
      modelName: "Iron 883",
      shops: [2, 4],
      price: 1100,
      image: require("../assets/vehiclesPictures/Harley-Davidson Iron 883.png"),
      type: "Motorcycles",
      tags: [
        "Classic",
        "Stylish"
      ],
      transmission: "Manual",
      fuelType: "Gasoline",
      seatingCapacity: 2,
    },
    {
      id: 16,
      brandName: "Yamaha",
      modelName: "MT-07",
      shops: [3, 5],
      price: 1200,
      image: require("../assets/vehiclesPictures/Yamaha MT-07.png"),
      type: "Motorcycles",
      tags: [
        "Sporty",
        "Agile"
      ],
      transmission: "Manual",
      fuelType: "Gasoline",
      seatingCapacity: 2,
    },
    {
      id: 17,
      brandName: "Honda",
      modelName: "CR-V",
      shops: [4, 6],
      price: 1700,
      image: require("../assets/vehiclesPictures/Honda CR-V.png"),
      type: "SUVs",
      tags: [
        "Comfortable",
        "Reliable"
      ],
      transmission: "Automatic",
      fuelType: "Gasoline",
      seatingCapacity: 5,
    },
    {
      id: 18,
      brandName: "Subaru",
      modelName: "Outback",
      shops: [5, 1],
      price: 1800,
      image: require("../assets/vehiclesPictures/Subaru Outback.png"),
      type: "SUVs",
      tags: [
        "Adventurous",
        "Spacious"
      ],
      transmission: "Automatic",
      fuelType: "Gasoline",
      seatingCapacity: 5,
    }
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