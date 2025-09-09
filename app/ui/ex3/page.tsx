import React from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Image from 'next/image'

// Type definitions for categories
interface Category {
    slug: string
    name: string
    url: string
}

// Server component - fetches data from our API route
async function fetchCategories(): Promise<Category[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ex3`, {
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Failed to fetch categories:', error)
        return []
    }
}

export default async function Page() {
    // Fetch categories data on the server
    const categories = await fetchCategories()

    return (
        <>
            <Header />
            <div className="min-h-screen bg-purple-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Server Component Indicator */}
                    <div className="mb-6 bg-green-800 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12l4-4m-4 4l4 4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-white">Next.js Server Component</h3>
                                <p className="text-green-100 mt-1">This component fetches data from /api/ex3 route handler on the server</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Product Categories</h1>
                        <p className="mt-2 text-gray-600">Browse our collection by category</p>
                    </div>

                    {categories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/ui/ex3/${category.slug}`}
                                    className="group"
                                >
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group-hover:scale-105">
                                        {/* Category Image Placeholder */}

                                        <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                                                <div className="text-center text-white">
                                                    <Image
                                                        src={`https://dummyjson.com/image/300x200/008080/ffffff?text=${category.name}`}
                                                        alt={category.name}
                                                        fill
                                                        className="w-full h-48 object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="text-xl font-semibold text-gray-900 mb-2 capitalize group-hover:text-blue-600 transition-colors duration-300">
                                                        {category.name}
                                                    </h2>
                                                    <p className="text-sm text-gray-500 mb-4">
                                                        Slug: {category.slug}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                                                    Browse Category
                                                </span>
                                                <svg className="w-5 h-5 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-4.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Found</h3>
                                <p className="text-gray-600">Unable to load product categories at this time.</p>
                            </div>
                        </div>
                    )}

                    {categories.length > 0 && (
                        <div className="mt-8 text-center text-gray-600">
                            <p>Showing {categories.length} categories</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}