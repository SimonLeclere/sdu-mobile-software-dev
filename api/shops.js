const shops = [
    {
        id: 1,
        city: "Odense",
        name: "Carrie's HQ",
        location: {
            latitude: 55.39492,
            longitude: 10.39488
        },
        address: "Tværgade 9, 5000 Odense, Denmark",
    },
    {
        id: 2,
        city: "Copenhagen",
        name: "The Little Mermaid Shop",
        location: {
            latitude: 55.6761,
            longitude: 12.5683
        },
        address: "Rådhuspladsen 5, 1550 København, Denmark",
    },
    {
        id: 3,
        city: "Aarhus",
        name: "Viking Supplies",
        location: {
            latitude: 56.1629,
            longitude: 10.2039
        },
        address: "Livøsmøgen 36, 8000 Aarhus, Denmark",
    },
    {
        id: 4,
        city: "Aalborg",
        name: "North Sea Trading",
        location: {
            latitude: 57.0488,
            longitude: 9.9217
        },
        address:"Østerågade 17, 9000 Aalborg, Denmark",
    },
    {
        id: 5,
        city: "Esbjerg",
        name: "West Coast Hub",
        location: {
            latitude: 55.4670,
            longitude: 8.4528
        },
        address: "Skolegade 31, 6700 Esbjerg, Denmark",
    },
    {
        id: 6,
        city: "Roskilde",
        name: "Viking Shipyard",
        location: {
            latitude: 55.6419,
            longitude: 12.0878
        },
        address: "Dronning Margrethes Vej 14, 4000 Roskilde, Denmark",
    }
];


function getShops() {
    return shops;
}

function getShopById(id) {
    return shops.find(shop => shop.id === id);
}

export { getShops, getShopById };