import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';

const geminiRouter = Router();

let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

/**
 * Maps Grounding API endpoint
 * Provides live, real-time Google Maps place intelligence, amenities, ratings, reviews and links
 */
geminiRouter.post('/maps-grounding', async (req, res) => {
  try {
    const { prompt, location, schoolName, propertyTitle } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getAIClient();
    const lat = location?.latitude || 1.3521;
    const lng = location?.longitude || 103.8198;

    const contextualPrompt = `You are an expert Singapore real estate & MOE school district analyst.
Target Location Context: ${propertyTitle || 'Singapore Property'} near ${schoolName || 'Singapore Primary School'} (Lat: ${lat}, Lng: ${lng}).
User Query: ${prompt}

Provide a comprehensive, accurate neighborhood breakdown. Mention specific places, verified distances, amenities, transit options, tuition/enrichment hubs, and family conveniences.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: contextualPrompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng,
            },
          },
        },
      },
    });

    const text = response.text || '';
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];

    // Extract all Google Maps places and web links
    const mapsLinks: Array<{ title: string; uri: string; address?: string; rating?: number; reviewSnippets?: string[] }> = [];

    for (const chunk of groundingChunks as any[]) {
      if (chunk.maps) {
        mapsLinks.push({
          title: chunk.maps.title || 'View on Google Maps',
          uri: chunk.maps.uri || '',
          address: chunk.maps.address || '',
          rating: chunk.maps.rating,
          reviewSnippets: chunk.maps.placeAnswerSources?.reviewSnippets || [],
        });
      } else if (chunk.web) {
        mapsLinks.push({
          title: chunk.web.title || 'Related Source',
          uri: chunk.web.uri || '',
        });
      }
    }

    return res.json({
      text,
      mapsGrounding: mapsLinks,
      searchQueries: groundingMetadata?.webSearchQueries || [],
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Gemini Maps Grounding Error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to fetch Maps Grounded intelligence',
      text: 'Unable to retrieve live Google Maps data at this moment. Please verify your connection or API key.',
      mapsGrounding: [],
    });
  }
});

/**
 * Search Grounding API endpoint
 * Provides up-to-date MOE Primary 1 registration statistics, balloting history, URA Master Plan news & real estate developments
 */
geminiRouter.post('/search-grounding', async (req, res) => {
  try {
    const { prompt, schoolName, district, topic } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getAIClient();

    let topicInstructions = '';
    if (topic === 'p1_balloting') {
      topicInstructions = `Focus specifically on official Singapore MOE Primary 1 registration statistics, historical balloting phases (Phase 2A, 2B, 2C, 2C Supplementary for <1km vs 1-2km applicants), vacancy rates, and school affiliation for ${schoolName || 'the requested school'}.`;
    } else if (topic === 'master_plan') {
      topicInstructions = `Focus on Singapore URA Master Plan rezoning, Land Transport Authority (LTA) MRT expansions (e.g. Cross Island Line, TEL, JRL), BTO launches, and regional commercial hubs in ${district || 'this area'}.`;
    } else if (topic === 'market_trends') {
      topicInstructions = `Focus on recent Singapore property market transaction benchmarks, private condo vs HDB price trends, rental yields, and capital appreciation for properties in ${district || 'this region'}.`;
    }

    const fullPrompt = `You are Singapore's premier Property & MOE School Intelligence Analyst.
${topicInstructions}
Context: School: ${schoolName || 'All Singapore Primary Schools'}, Estate/District: ${district || 'Singapore'}.
User Request: ${prompt}

Search live Google sources to give precise, up-to-date, factual information. Highlight key metrics and cite all findings clearly.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: fullPrompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || '';
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];

    // Extract all Google Search grounded web citations
    const searchLinks: Array<{ title: string; uri: string }> = [];

    for (const chunk of groundingChunks as any[]) {
      if (chunk.web) {
        searchLinks.push({
          title: chunk.web.title || 'Official Source',
          uri: chunk.web.uri || '',
        });
      }
    }

    return res.json({
      text,
      webGrounding: searchLinks,
      searchQueries: groundingMetadata?.webSearchQueries || [],
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Gemini Search Grounding Error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to fetch Search Grounded intelligence',
      text: 'Unable to retrieve live Google Search data at this moment. Please verify your connection or API key.',
      webGrounding: [],
    });
  }
});

export default geminiRouter;
