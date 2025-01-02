import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'tt81m3xp', // Replace with your Sanity project ID
  dataset: 'production',
  apiVersion: '2024-01-03', // Keep this updated to match the current API version
  useCdn: true, // Set to false if you need real-time data
});
