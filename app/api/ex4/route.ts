import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Fetch categories from the external API
        const response = await fetch('https://dummyjson.com/products/category-list')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const categories: string[] = await response.json()

        // Return the categories with proper headers
        return NextResponse.json(categories, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        )
    }
}