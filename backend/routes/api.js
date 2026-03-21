import express from 'express';
import { parseSearchQuery } from '../services/parserService.js';
import { buildTinyFishGoal } from '../services/goalBuilder.js';
import { runTask } from '../services/tinyfishService.js';

const router = express.Router();

// Endpoint for property search via natural language
router.post('/search', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    console.log(`🔍 Query: "${query}"`);

    // 1️⃣ Parse query
    const parsedData = await parseSearchQuery(query);
    console.log("🧠 Parsed Data:", parsedData);

    // 2️⃣ Get top 2 websites
    const websites = parsedData.recommended_websites?.slice(0, 2);

    if (!websites || websites.length === 0) {
      throw new Error("No recommended websites found");
    }

    console.log("🌐 Websites:", websites);

    // 3️⃣ Build TinyFish goal
    const goal = buildTinyFishGoal(parsedData);
    console.log("🎯 Goal:", goal);

    // 4️⃣ Run TinyFish on BOTH websites
    const results = [];

    for (let site of websites) {
      try {
        console.log("🚀 Trying:", site);

        const result = await runTask(site, goal);

        if (result) {
          console.log("✅ Success on:", site);

          results.push({
            site,
            data: result
          });
        }

      } catch (err) {
        console.log("❌ Failed on:", site, err.message);
      }
    }

    // 5️⃣ If all failed
    if (results.length === 0) {
      throw new Error("TinyFish failed on all recommended websites");
    }

    // 6️⃣ Send response
    res.json({
      success: true,
      message: "Search + TinyFish execution successful",
      parsed: parsedData,
      total_sources: results.length,
      tinyfish_results: results
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      error: 'Failed to process search.',
      details: error.message
    });
  }
});

export default router;