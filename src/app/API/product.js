// pages/api/products.js
import { client } from '@/sanity/lib/client'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await client.fetch(`
        *[_type == "product"] {
          "id": _id,
          name,
          "slug": slug.current,
          price,
          description,
          "category": category->name,
          stock,
          "image": image.asset->url
        }
      `)
      
      res.status(200).json(products)
    } catch (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}