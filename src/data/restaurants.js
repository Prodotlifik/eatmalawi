// NOTE: bookingPhone values for restaurants 1, 3 and 4 are placeholders —
// replace with real numbers before launch.
const restaurantsData = [
  {
    id: 1,
    name: "The Emerald",
    city: "Lilongwe",
    cuisine: "Modern",
    location: "Area 47, Lilongwe",
    description: "Modern dining with a relaxed, upscale feel.",
    image: "/featured/emerald.jpg",
    images: [
      "/featured/emerald.jpg",
      "/featured/emerald1.jpg",
      "/featured/emerald2.jpg"
    ],
    menu: [
      {
        name: "Quesadilla",
        description: "Grilled tortilla filled with melted cheese and seasoned chicken or beef.",
        price: 48500,
        image: "/menu/quesadilla.png"
      },
      {
        name: "Greek Salad",
        description: "Fresh tomatoes, cucumbers, olives, feta cheese, and light olive oil dressing.",
        price: 36500,
        image: "/menu/greek-salad.jpg"
      },
      {
        name: "Lobster Bisque",
        description: "Rich and creamy lobster soup with a smooth, savoury finish.",
        price: 66500,
        image: "/menu/lobster-bisque.jpg"
      },
      {
        name: "Special Carne",
        description: "Grilled marinated beef served tender and full of flavour.",
        price: 56500,
        image: "/menu/Carna.png"
      }
    ],
    bookingPhone: "+265893788574"
  },
  {
    id: 2,
    name: "Culinary Delights",
    city: "Blantyre",
    cuisine: "Casual",
    location: "Victoria Avenue, Blantyre",
    description: "Casual dining with familiar flavours and generous portions.",
    image: "/featured/Culinary.jpg",
    images: [
      "/featured/Culinary.jpg",
      "/featured/Culinary1.jpg",
      "/featured/Culinary2.jpg"
    ],
    menu: [
      {
        name: "Grilled Chicken & Chips",
        description: "Juicy grilled chicken served with seasoned golden fries.",
        price: 36500,
        image: "/menu/culinary/grilledchicken.png"
      },
      {
        name: "Beef Stir Fry",
        description: "Tender beef strips tossed with mixed vegetables in a light soy sauce.",
        price: 28500,
        image: "/menu/culinary/beef.png"
      },
      {
        name: "Fish Fillet Plate",
        description: "Pan-fried fish fillet with rice and a fresh side salad.",
        price: 43500,
        image: "/menu/culinary/fish.jpg"
      },
      {
        name: "Vegetable Pasta",
        description: "Creamy pasta cooked with seasonal vegetables and herbs.",
        price: 33500,
        image: "/menu/culinary/pasta.jpg"
      }
    ],
    bookingPhone: "+265893788574"
  },
  {
    id: 3,
    name: "Big Mama's",
    city: "Mzuzu",
    cuisine: "Contemporary",
    location: "Mzuzu",
    description: "Contemporary meals in a relaxed, modern setting.",
    image: "/featured/Bigmama.jpg",
    images: [
      "/featured/Bigmama.jpg",
      "/featured/Bigmama1.jpg",
      "/featured/Bigmama2.jpg"
    ],
    menu: [
      {
        name: "Lemon Grilled Fish",
        description: "Fresh fish grilled and finished with a light lemon butter glaze.",
        price: 47500,
        image: "/menu/mama/fish.jpg"
      },
      {
        name: "Signature Beef Burger",
        description: "Grilled beef patty with cheese, lettuce, and house-made sauce.",
        price: 28500,
        image: "/menu/mama/burger.jpg"
      },
      {
        name: "Chicken Wrap",
        description: "Grilled chicken, crisp vegetables, and sauce wrapped in soft flatbread.",
        price: 33500,
        image: "/menu/mama/wrap.jpg"
      },
      {
        name: "Loaded Fries",
        description: "Crispy fries topped with melted cheese and grilled beef strips.",
        price: 39500,
        image: "/menu/mama/fries.jpg"
      }
    ],
    bookingPhone: "+265893788574"
  },
  {
    id: 4,
    name: "Red Dragon",
    city: "Zomba",
    cuisine: "Mexican",
    location: "Zomba",
    description: "Simple, well-prepared dishes inspired by everyday favourites.",
    image: "/featured/reddragon.jpg",
    images: [
      "/featured/reddragon.jpg",
      "/featured/reddragon1.jpg",
      "/featured/reddragon2.jpg"
    ],
    menu: [
      {
        name: "Shrimp Tacos",
        description: "Soft tortillas filled with seasoned shrimp, fresh slaw, and house sauce.",
        price: 79500,
        image: "/menu/dragon/shrimp.jpg"
      },
      {
        name: "Grilled Salmon Plate",
        description: "Grilled salmon fillet served with vegetables and a light lemon glaze.",
        price: 58500,
        image: "/menu/dragon/salmon.jpg"
      },
      {
        name: "Lobster Roll",
        description: "Buttery toasted roll filled with chilled lobster in light seasoning.",
        price: 43500,
        image: "/menu/dragon/lobster-roll.jpg"
      },
      {
        name: "Birria",
        description: "Slow-cooked beef in a rich, spiced broth, tender and deeply flavoured.",
        price: 47500,
        image: "/menu/dragon/birria.jpg"
      }
    ],
    bookingPhone: "+265893788574"
  }
];

// Shared helpers
export const formatPrice = (price) => `MWK ${price.toLocaleString()}`;

export default restaurantsData;
