import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

/**
 * 🔥 Infer currency from country
 */
function inferCurrency(country) {
  const map = {
    India: "₹",
    USA: "$",
    "United States": "$",
    UK: "£",
    "United Kingdom": "£",
    UAE: "AED",
    "United Arab Emirates": "AED",
    Russia: "₽"
  };

  return map[country] || "₹";
}

/**
 * 🔥 Parses natural language → structured JSON
 */
export async function parseSearchQuery(query) {
  const prompt = `
You are a real estate data extraction API.

Return valid JSON only.

Schema:
{
  "location": string,
  "state": string,
  "country": string,
  "transaction_type": "buy" | "rent",
  "currency": string,
  "max_price": number,
  "bedrooms": number,
  "bathrooms": number,
  "property_type": string,
  "preferences": string[],
  "recommended_websites": string[]
}

Rules:
- Extract full location (locality + city) into ONE field "location"
- Example: "Gamma 2, Greater Noida"
- Do NOT split locality and city
- Do NOT put locality in preferences

- Extract transaction_type (rent/buy). Default: buy
- Convert 50L → 5000000, 1Cr → 10000000
- Infer country if missing

- Always include at least 2 valid real estate websites

India:
["https://www.99acres.com", "https://www.magicbricks.com", "https://housing.com"]

USA:
["https://www.zillow.com", "https://www.realtor.com"]

UK:
["https://www.rightmove.co.uk", "https://www.zoopla.co.uk"]

UAE:
["https://www.propertyfinder.ae", "https://www.bayut.com"]

Query: "${query}"
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "PropFishAI"
        }
      }
    );

    const text = response.data.choices[0].message.content.trim();

    // 🔥 Safe JSON parsing
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON found");
      parsedData = JSON.parse(match[0]);
    }

    // 🔥 Fix missing transaction type
    if (!parsedData.transaction_type) {
      parsedData.transaction_type = "buy";
    }

    // 🔥 Fix currency
    if (!parsedData.currency) {
      parsedData.currency = inferCurrency(parsedData.country);
    }

    // 🔥 Fix websites fallback
    if (!parsedData.recommended_websites || parsedData.recommended_websites.length === 0) {
      parsedData.recommended_websites = [
        "https://www.99acres.com",
        "https://www.magicbricks.com"
      ];
    }

    return parsedData;

  } catch (error) {
    console.error("OpenRouter error:", error.response?.data || error.message);
    throw new Error("Failed to parse query: " + error.message);
  }
}