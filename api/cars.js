const carsData = [
    {
      id: 1,
      brandName: "Audi",
      modelName: "Sportback RS 5",
      price: 1400,
      image: require("../assets/vehiclesPictures/Audi RS5 Sportback.png"),
      type: "Cars",
      tags: [
        "Sporty"
      ],
      transmission: "Automatic",
      fuelType: "Gasoline",
      seatingCapacity: 5,
      location: {
        latitude: 55.40733784138907,
        longitude: 10.41841894551394
      }
    },
    {
      id: 2,
      brandName: "Audi",
      modelName: "Cabriolet A5",
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
      location: {
        latitude: 55.39581741930345,
        longitude: 10.426239193099724
      }
    },
    {
      id: 3,
      brandName: "Lexus",
      modelName: "ES Hybrid",
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
      location: {
        latitude: 55.402115101616886,
        longitude: 10.433543507319722
      }
    },
    {
      id: 4,
      brandName: "Lexus",
      modelName: "LS F Sport",
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
      location: {
        latitude: 55.378142961223524,
        longitude: 10.408108839980603
      }
    },
    {
      id: 5,
      brandName: "Tesla",
      modelName: "Model 3",
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
      location: {
        latitude: 55.37750867847129,
        longitude: 10.396726300637376
      }
    },
    {
      id: 6,
      brandName: "Toyota",
      modelName: "Prius",
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
      location: {
        latitude: 55.34889909358107,
        longitude: 10.339068750173913
      }
    },
    {
      id: 7,
      brandName: "BMW",
      modelName: "X5",
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
      location: {
        latitude: 55.38161958312142,
        longitude: 10.399752920934622
      }
    },
    {
      id: 8,
      brandName: "Ford",
      modelName: "Mustang",
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
      location: {
        latitude: 55.42470253201329,
        longitude: 10.426577239421123
      }
    },
    {
      id: 9,
      brandName: "Chevrolet",
      modelName: "Tahoe",
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
      location: {
        latitude: 55.34759170638018,
        longitude: 10.349122556668458
      }
    },
    {
      id: 10,
      brandName: "Nissan",
      modelName: "Leaf",
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
      location: {
        latitude: 55.38634655460643,
        longitude: 10.389674970189843
      }
    },
    {
      id: 11,
      brandName: "Chevrolet",
      modelName: "Silverado",
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
      location: {
        latitude: 55.437196285345955,
        longitude: 10.397556754519874
      }
    },
    {
      id: 12,
      brandName: "Jeep",
      modelName: "Wrangler",
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
      location: {
        latitude: 55.44022233576085,
        longitude: 10.387943325355659
      }
    },
    {
      id: 13,
      brandName: "Mercedes-Benz",
      modelName: "Sprinter Van",
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
      location: {
        latitude: 55.43594223168204,
        longitude: 10.343319991942549
      }
    },
    {
      id: 14,
      brandName: "Dodge",
      modelName: "Ram 1500",
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
      location: {
        latitude: 55.41016003874683,
        longitude: 10.402725455438464
      }
    },
    {
      id: 15,
      brandName: "Harley-Davidson",
      modelName: "Iron 883",
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
      location: {
        latitude: 55.34894761494791,
        longitude: 10.37817054385879
      }
    },
    {
      id: 16,
      brandName: "Yamaha",
      modelName: "MT-07",
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
      location: {
        latitude: 55.40618283149757,
        longitude: 10.347980697382907
      }
    },
    {
      id: 17,
      brandName: "Honda",
      modelName: "CR-V",
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
      location: {
        latitude: 55.41273768757781,
        longitude: 10.374240131758906
      }
    },
    {
      id: 18,
      brandName: "Subaru",
      modelName: "Outback",
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
      location: {
        latitude: 55.43382305595532,
        longitude: 10.347593336101284
      }
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