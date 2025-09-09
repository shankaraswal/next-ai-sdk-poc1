import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Fetch data from the external API
        const response = await fetch('https://dummyjson.com/products?limit=36')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Return the data with proper headers
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
        })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}