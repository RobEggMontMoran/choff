const dummyBrews = [
  {
    // Mandatory fields
    id: "1",
    beanName: "Mamba", // Dropdown (Beans stored in DB)
    // When recording new brew from the same beans, defaults to last saved measurements for that bean
    dose: 18.5, // Slider - First brew recorded for the beans defaults to 18
    yieldAmount: 36, // Slider - First brew recorded for the beans defaults to 36
    brewTime: 27, // Slider - First brew recorded for the beans defaults to 28
    temperature: 94, // Slider - First brew recorded for the beans defaults to 92
    grindSize: 5, // Slider - First brew recorded for the beans defaults to 7
    rating: 9.5, // Slider - defaults to 5
    date: "2025-07-08", // Calendar - defaults to today's date

    // Optional Fields
    aroma: 5, // Slider - defaults to 5
    sweetness: 5, // Slider - defaults to 5
    acidity: 5, // Slider - defaults to 5
    bitterness: 5, // Slider - defaults to 5
    body: 5, // Slider - defaults to 5
    notes: "Balanced shot. Plum and nut notes come through well at this ratio.", // TextBox
  },
  {
    id: "2",
    beanName: "Colombian Supremo",
    dose: 18,
    yieldAmount: 38,
    brewTime: 30,
    temperature: 93,
    grindSize: 4,
    notes: "Slightly longer shot brought out toffee notes. Mild acidity.",
    date: "2025-07-08",
    rating: 8,
  },
  {
    id: "3",
    beanName: "House Blend",
    dose: 17.8,
    yieldAmount: 35,
    brewTime: 26,
    temperature: 94,
    grindSize: 6,
    notes: "Good crema. Chocolate and hazelnut finish. A solid everyday shot.",
    date: "2025-07-07",
    rating: 9,
  },
  {
    id: "4",
    beanName: "El Salvador Honey",
    dose: 18.2,
    yieldAmount: 36,
    brewTime: 28,
    temperature: 93,
    grindSize: 5,
    notes: "Sweet and delicate. Bright acidity with honey undertones.",
    date: "2025-07-07",
    rating: 7.5,
  },
  {
    id: "5",
    beanName: "Kilimanjaro Peaks",
    dose: 18,
    yieldAmount: 34,
    brewTime: 25,
    temperature: 92,
    grindSize: 6,
    notes: "Sharp citrus on first sip. Slightly over-extracted. Try coarser grind.",
    date: "2025-07-07",
    rating: 6,
  },
  {
    id: "6",
    beanName: "Wild Atlantic Roast",
    dose: 19,
    yieldAmount: 38,
    brewTime: 29,
    temperature: 94,
    grindSize: 4,
    notes: "Big body and bold flavor. Intense dark roast profile shines.",
    date: "2025-07-06",
    rating: 10,
  },
  {
    id: "7",
    beanName: "Brazillian Rainforest",
    dose: 17.5,
    yieldAmount: 35,
    brewTime: 27,
    temperature: 93,
    grindSize: 5,
    notes: "Earthy and nutty. Medium acidity. Great with milk.",
    date: "2025-07-04",
    rating: 8,
  },
  {
    id: "8",
    beanName: "Colombian Gold",
    dose: 18.5,
    yieldAmount: 37,
    brewTime: 28,
    temperature: 94,
    grindSize: 5,
    notes: "Silky mouthfeel. Red berry finish. Slight bitterness on cooling.",
    date: "2025-07-02",
    rating: 7.5,
  },
  {
    id: "9",
    beanName: "Roaster's Reserve",
    dose: 19,
    yieldAmount: 38,
    brewTime: 30,
    temperature: 95,
    grindSize: 4,
    notes: "Rich and syrupy. Blackcurrant and molasses. Outstanding shot.",
    date: "2025-07-02",
    rating: 9,
  },
  {
    id: "10",
    beanName: "Seasonal Espresso",
    dose: 18.2,
    yieldAmount: 36,
    brewTime: 27,
    temperature: 94,
    grindSize: 5,
    notes: "Sweet spot found with this ratio. Crisp acidity and floral aroma.",
    date: "2025-07-01",
    rating: 7.5,
  },
  {
    id: "11",
    beanName: "Roaster's Reserve",
    dose: 19.5,
    yieldAmount: 40,
    brewTime: 30,
    temperature: 95,
    grindSize: 4,
    notes: "Smooth mouthfeel. Blackcurrant and molasses. Perfect.",
    date: "2025-07-02",
    rating: 9,
  },
  {
    id: "12",
    beanName: "Seasonal Espresso",
    dose: 19,
    yieldAmount: 38,
    brewTime: 27,
    temperature: 94,
    grindSize: 5,
    notes: "Could be better. Bitter aftertaste.",
    date: "2025-07-01",
    rating: 8,
  },
];

export default dummyBrews;
