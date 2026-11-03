import { speakerData } from '../data/portfolioData.js';

export function getPortfolio(_req, res) {
  res.json({ success: true, data: speakerData });
}
