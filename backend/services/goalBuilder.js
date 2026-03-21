export function buildTinyFishGoal(data) {
    return `
Search for ${data.bedrooms || ""} BHK properties in ${data.city}, ${data.country}
under ₹${data.max_price}.

Preferences: ${data.preferences?.join(", ") || "None"}

Steps:
1. Apply filters for price and bedrooms
2. Open top listings
3. Extract:
   - price
   - location
   - area
   - bedrooms
   - URL

Return 3-5 results in structured format.
`;
}