import { NextResponse } from 'next/server'

interface RouteParams {
    params: Promise<{
        category: string
    }>
}

export async function GET(request: Request, { params }: RouteParams) {
    const { category } = await params

    try {
        // Fetch products for the specific category from the external API
        const response = await fetch(`https://dummyjson.com/products/category/${category}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Return the data with proper headers for caching
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: `Failed to fetch products for category: ${category}` },
            { status: 500 }
        )
    }
}