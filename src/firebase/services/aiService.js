const GEMINI_API_KEY = "AIzaSyAMwEBlsdv2F5TKzScDeRvby5r0jl14Q-A";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Generates a brewing suggestion from the Gemini API based on brew data
 * @param {object} brewData - The brew data object from the BrewEntryScreen state
 * @returns {Promise<string>} A promise that resolves with the AI's suggestion
 */
export const getBrewSuggestion = async (brewData) => {
  // Prompt for the AI model
  const prompt = `
    You are an expert home barista assistant named 'Choff'.
    A user has submitted the following data for an espresso shot they just brewed:

    - Bean Name: ${brewData.beanName}
    - Dose (grams of coffee): ${brewData.dose}g
    - Yield (grams of liquid espresso): ${brewData.yieldAmount}g
    - Brew Time: ${brewData.brewTime} seconds
    - Water Temperature: ${brewData.temperature}°C
    - Grind Size: ${brewData.grindSize} (on a scale of 1-20, where 1 is finest)
    - User's Overall Rating: ${brewData.rating} out of 10

    Optional tasting feedback provided by the user:
    - Aroma: ${brewData.tastingProfile.aroma}/10
    - Acidity: ${brewData.tastingProfile.acidity}/10
    - Sweetness: ${brewData.tastingProfile.sweetness}/10
    - Body: ${brewData.tastingProfile.body}/10
    - Bitterness: ${brewData.tastingProfile.bitterness}/10
    - General Notes: "${brewData.notes}"

    Based on this data, provide a single, concise, and actionable recommendation to help the user improve their next brew.
    The recommendation should be one sentence long. For example: "Try grinding slightly coarser to reduce bitterness" or "Consider a shorter brew time to enhance sweetness."
    Do not greet the user or add any extra conversational text. Provide only the recommendation.
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Gemini API Error:", errorBody);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Navigate through the response structure to get the generated text
    const suggestion = data.candidates[0]?.content?.parts[0]?.text;

    if (!suggestion) {
      throw new Error("Could not extract suggestion from API response.");
    }

    // Clean up the response - remove any potential markdown or extra whitespace
    return suggestion.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Could not get a suggestion at this time. Please check your connection and API key.";
  }
};
