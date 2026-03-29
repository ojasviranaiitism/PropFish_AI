import express from 'express';
import { parseSearchQuery } from '../services/parserService.js';
import { buildTinyFishGoal } from '../services/goalBuilder.js';
import { runTasksConcurrently } from '../services/tinyfishService.js';
import { pickBestListing } from '../services/recommendationService.js';

const router = express.Router();

/**
 * 🔹 NORMAL API (no streaming)
 */
router.post('/search', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const parsedData = await parseSearchQuery(query);

    const websites = parsedData.recommended_websites?.slice(0, 2);
    if (!websites?.length) throw new Error("No recommended websites");

    const goal = buildTinyFishGoal(parsedData);

    const results = await runTasksConcurrently(websites, goal);

    const successfulResults = results.filter(r => r.result);

    // 🏆 Pick best listing across all sites
    const allListings = successfulResults.flatMap(r =>
      r.result?.listings || r.result?.top_listings || []
    );
    const recommendation = await pickBestListing(allListings, parsedData);

    // Tag the best listing in-place
    if (recommendation?.bestUrl) {
      for (const r of successfulResults) {
        const listings = r.result?.listings || r.result?.top_listings || [];
        for (const l of listings) {
          if (l.url === recommendation.bestUrl) {
            l.isBestPick = true;
            l.bestReason = recommendation.reason;
          }
        }
      }
    }

    res.json({
      success: true,
      parsed: parsedData,
      tinyfish_results: successfulResults,
      recommendation
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to process search.',
      details: error.message
    });
  }
});

/**
 * 🔥 STREAMING API (SSE)
 */
router.get('/search-stream', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Query required' });
  }

  // 🔥 SSE headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let interval; // ✅ FIXED scope

  try {
    console.log("🔍 SSE Query:", query);

    // 1️⃣ Parse
    const parsedData = await parseSearchQuery(query);
    

    // 2️⃣ Websites
    const websites = parsedData.recommended_websites?.slice(0, 2);
    if (!websites?.length) throw new Error("No recommended websites");

    // 3️⃣ Goal
    const goal = buildTinyFishGoal(parsedData);

    // 🔥 initial event
    res.write(`data: ${JSON.stringify({
      type: "START",
      message: "Starting AI search...",
      status: "start"
    })}\n\n`);

    // 🔥 keep connection alive
    interval = setInterval(() => {
      res.write(`data: ${JSON.stringify({ type: "PING" })}\n\n`);
    }, 5000);

    // 🔥 client disconnect handling
    req.on('close', () => {
      console.log("❌ Client disconnected");
      clearInterval(interval);
    });

    // 🔥 event handler (important)
    const onEvent = (event) => {
      // ✅ STREAM EVERYTHING
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    // 4️⃣ Run TinyFish
    const results = await runTasksConcurrently(websites, goal, onEvent);

    // 🏆 Pick best listing across all sites
    const successfulResults = results.filter(r => r.result);
    const allListings = successfulResults.flatMap(r =>
      r.result?.listings || r.result?.top_listings || []
    );

    res.write(`data: ${JSON.stringify({
      type: "LOG",
      message: "🏆 Analyzing best property match...",
      status: "progress"
    })}\n\n`);

    const recommendation = await pickBestListing(allListings, parsedData);

    // Tag the best listing in-place
    if (recommendation?.bestUrl) {
      for (const r of results) {
        const listings = r.result?.listings || r.result?.top_listings || [];
        for (const l of listings) {
          if (l.url === recommendation.bestUrl) {
            l.isBestPick = true;
            l.bestReason = recommendation.reason;
          }
        }
      }
    }

    // 🔥 Emit recommendation event
    if (recommendation) {
      res.write(`data: ${JSON.stringify({
        type: "RECOMMENDATION",
        message: `⭐ Best pick identified: ${recommendation.reason}`,
        status: "success",
        recommendation
      })}\n\n`);
    }

    // 🔥 final event
    res.write(`data: ${JSON.stringify({
      type: "FINAL",
      message: "All agents completed",
      results: results,
      recommendation
    })}\n\n`);

    clearInterval(interval);
    res.end();

  } catch (error) {
    res.write(`data: ${JSON.stringify({
      type: "ERROR",
      status: "error",
      message: error.message
    })}\n\n`);

    if (interval) clearInterval(interval);
    res.end();
  }
});

export default router;