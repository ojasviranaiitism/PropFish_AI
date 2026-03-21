import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

/**
 * Parses a natural language search query into structured JSON using OpenRouter.
 */
//! find me a 2bhk room to rent under 12000 rupees per month in Greater Noida Sector Beta 2 near Schools
export async function parseSearchQuery(query) {
  const prompt = `
You are an expert real estate data extraction API.
Return ONLY valid JSON. No markdown. No explanation.

Schema:
{
  "city": string,
  "state": string,
  "country": string,
  "max_price": number,
  "bedrooms": number,
  "property_type": string,
  "preferences": string[],
  "recommended_websites": string[]
}

Rules:
- Convert 50L → 5000000, 1Cr → 10000000
- If a field is missing, omit it
- It should also find properties that can be rented or bought based on query
- Always infer "country" from city/state if not provided
  (e.g., Bangalore → India, New York → USA)

- ALWAYS return at least ONE valid real estate website in "recommended_websites"
- DO NOT return generic search engines like Google

Website selection rules:

For India:
["https://www.99acres.com", "https://www.magicbricks.com", "https://housing.com"]

For USA:
["https://www.zillow.com", "https://www.realtor.com", "https://www.redfin.com"]

For UK:
["https://www.rightmove.co.uk", "https://www.zoopla.co.uk"]

For UAE:
["https://www.propertyfinder.ae", "https://www.bayut.com"]

For unknown countries:
- Choose a well-known local real estate platform for that country
- If unsure, still return a real estate website (NOT Google)

- Ensure "recommended_websites" ALWAYS contains at least two valid URL

Query: "${query}"
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // optional
          "X-Title": "PropFishAI"
        }
      }
    );

    const text = response.data.choices[0].message.content.trim();

    // Extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found");
    }

    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("OpenRouter error:", error.response?.data || error.message);
    throw new Error("Failed to parse query: " + error.message);
  }
}