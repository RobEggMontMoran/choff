const dummyBeans = [
  {
    // Mandatory fields
    id: "1",
    name: "Mamba", // TextBox
    roaster: "3FE", // TextBox
    blend: "Single Origin", // Dropdown
    origin: "Ethiopia", // Dropdown?

    // Add granularity here if not single origin
    // [
    //   { country: "Ethiopia", percentage: 60 },
    //   { country: "Brazil", percentage: 40 },
    // ],
    roastType: "Dark", // Dropdown
    roastDate: "2024-05-20", // Calendar
    rating: 9.5, // Slider

    // Optional fields
    processMethod: "Washed", // Dropdown
    bagSize: 500, // Slider
    price: 24.99, // Slider
    isDecaf: false, // Box
    flavourProfile: ["fruity", "nutty"], // Dowpdown/ Tags
    userNotes: "Apple and plum notes, with a nutty finish - like cashews. Best drank as espresso", // TextBox
    photoUrl: "",
  },
  {
    id: "2",
    name: "Colombian Supremo",
    roaster: "Cloud Picker",
    origin: "Colombia",
    roastType: "Medium",
    roastDate: "2024-06-01",
    rating: 8.0,
    photoUrl: "",
  },
  {
    id: "3",
    name: "House Blend",
    roaster: "Calendar Coffee",
    origin: "Brazil",
    roastType: "Medium",
    roastDate: "2024-05-18",
    rating: 9.0,
    photoUrl: "",
  },
  {
    id: "4",
    name: "El Salvador Honey",
    roaster: "Bell Lane",
    origin: "El Salvador",
    roastType: "Light",
    roastDate: "2024-05-25",
    rating: 7.5,
    photoUrl: "",
  },
  {
    id: "5",
    name: "Kilimanjaro Peaks",
    roaster: "Badger & Dodo",
    origin: "Tanzania",
    roastType: "Medium",
    roastDate: "2024-06-05",
    rating: 6.0,
    photoUrl: "",
  },
  {
    id: "6",
    name: "Wild Atlantic Roast",
    roaster: "Bear Market",
    origin: "Guatemala",
    roastType: "Dark",
    roastDate: "2024-06-02",
    rating: 10.0,
    photoUrl: "",
  },
  {
    id: "7",
    name: "Brazillian Rainforest",
    roaster: "Coffeeangel",
    origin: "Brazil",
    roastType: "Medium",
    roastDate: "2024-05-28",
    rating: 8.0,
    photoUrl: "",
  },
  {
    id: "8",
    name: "Colombian Gold",
    roaster: "Two Fifty Square",
    origin: "Colombia",
    roastType: "Light",
    roastDate: "2024-06-03",
    rating: 7.5,
    photoUrl: "",
  },
  {
    id: "9",
    name: "Roaster's Reserve",
    roaster: "The Barn Berlin",
    origin: "Kenya",
    roastType: "Dark",
    roastDate: "2024-05-30",
    rating: 9.0,
    photoUrl: "",
  },
  {
    id: "10",
    name: "Seasonal Espresso",
    roaster: "Silverskin Coffee",
    origin: "Ethiopia",
    roastType: "Medium",
    roastDate: "2024-06-06",
    rating: 7.5,
    photoUrl: "",
  },
];

export default dummyBeans;
