import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

/**
 * 🏆 Picks the best property from all collected listings using LLM reasoning.
 *
 * @param {Array}  allListings  - Flat array of listing objects (each with a `url` field)
 * @param {Object} parsedQuery  - The structured query from parserService
 * @returns {{ bestUrl: string, reason: string } | null}
 */
export async function pickBestListing(allListings, parsedQuery) {
  if (!allListings || allListings.length === 0) return null;

  // Build a compact summary of each listing for the prompt
  const listingSummaries = allListings.map((l, i) => {
    return `Listing ${i + 1}:
  - URL: ${l.url || 'N/A'}
  - Price: ${l.price || 'N/A'}
  - Address: ${l.address || l.location || 'N/A'}
  - Bedrooms: ${l.bedrooms || 'N/A'}
  - Area: ${l.area || 'N/A'}
  - Property Type: ${l.property_type || 'N/A'}
  - Key Features: ${Array.isArray(l.key_features) ? l.key_features.join(', ') : 'N/A'}`;
  }).join('\n\n');

  const userCriteria = `
- Desired Location: ${parsedQuery.location || 'N/A'}
- Transaction Type: ${parsedQuery.transaction_type || 'buy'}
- Max Budget: ${parsedQuery.currency || '₹'}${parsedQuery.max_price || 'any'}
- Bedrooms Needed: ${parsedQuery.bedrooms || 'any'}
- Bathrooms Needed: ${parsedQuery.bathrooms || 'any'}
- Preferences: ${parsedQuery.preferences?.join(', ') || 'none specified'}`;

  const prompt = `You are a real estate expert. A user is looking for a property with the following criteria:
${userCriteria}

Here are all the available listings found:

${listingSummaries}

Based on the user's criteria, analyze ALL listings and select the single BEST overall fit considering:
1. Value for money (price vs. budget)
2. Location match
3. Facilities and key features

Return ONLY valid JSON in this exact format, no markdown, no extra text:
{
  "best_url": "<the exact URL of the best listing>",
  "reason": "<one concise sentence explaining why this is the best pick>"
}`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'nvidia/nemotron-3-super-120b-a12b:free',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'PropFishAI'
        }
      }
    );

    const text = response.data.choices[0].message.content.trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error('No JSON found in recommendation response');
      parsed = JSON.parse(match[0]);
    }

    if (!parsed.best_url) throw new Error('LLM did not return a best_url');

    return {
      bestUrl: parsed.best_url,
      reason: parsed.reason || 'Best overall match for your criteria.'
    };

  } catch (error) {
    console.error('⚠️ Recommendation service error:', error.response?.data || error.message);
    return null; // non-fatal — graceful degradation
  }
}
