import express from 'express';
// import axios from 'axios';
import { parseSearchQuery } from '../services/parserService.js';

const router = express.Router();

// Endpoint for property search via natural language
router.post('/search', async (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    console.log(`Received natural language search query: "${query}"`);
    
    // Parse using Claude API
    const parsedData = await parseSearchQuery(query);
    console.log("Structured JSON extracted:", parsedData);
    
    // Simulating further backend processing or API integration with parsed data...
    
    // Return the parsed structured JSON to the frontend
    res.json({
      success: true,
      message: `Successfully parsed query into structured data.`,
      data: parsedData
    });
  } catch (error) {
    console.error('Error processing search:', error);
    res.status(500).json({ error: 'Failed to process natural language query.', details: error.message });
  }
});

export default router;
