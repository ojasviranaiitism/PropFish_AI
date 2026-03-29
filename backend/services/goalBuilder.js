export function buildTinyFishGoal(data) {
  const intent = data.transaction_type === "rent" ? "rent" : "buy";

  const location = data.location || "target city";
  const currency = data.currency || "₹";
  const budget = data.max_price ? `${currency}${data.max_price}` : "any";

  return `
Search ${intent} properties in ${location}.

Apply filters:
- Bedrooms: ${data.bedrooms || "any"}
- Bathrooms: ${data.bathrooms || "any"}
- Budget: ${budget}

Open top 3 listings.

For each listing, open the property detail page and extract the following:
- price
- address (the full street address explicitly listed in the 'More Details' or 'Address' field on the property page, e.g. "Ats chowk noida extension., Noida Extension, Greater Noida, Delhi NCR")
- location (general area/neighbourhood)
- area
- bedrooms
- property type
- URL
- image_url
- key_features (extract 2-3 attractive amenities or nearby landmarks like hospital, metro, mall, or grocery store that are visible on the listing card)

Return EXACTLY the following JSON format. Do not include markdown formatting or any other text structure.
{
  "listings": [
    {
      "price": "string",
      "address": "string",
      "location": "string",
      "area": "string",
      "bedrooms": "string",
      "property_type": "string",
      "url": "string",
      "image_url": "string",
      "key_features": ["string", "string"]
    }
  ]
}
`;
}