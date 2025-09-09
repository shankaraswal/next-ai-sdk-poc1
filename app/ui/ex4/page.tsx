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

// Server component - fetches categories for SSG demonstration
async function fetchCategories(): Promise<string[]> {
    try {
        const response = await fetch('https://dummyjson.com/products/category-list', {
            // Enable ISR - static generation with revalidation
            next: { revalidate: 86400 } // Revalidate every 24 hours
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const categories: string[] = await response.json()
        return categories
    } catch (error) {
        console.error('Failed to fetch categories:', error)
        return []
    }
}

export default async function Ex4Page() {
    // Fetch categories data on the server
    const categories = await fetchCategories()

    // Transform categories to match the expected format
    const formattedCategories: Category[] = categories.map(category => ({
        slug: category,
        name: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        url: `/ui/ex4/${category}`
    }))

    return (
        <>
            <Header />
            <div className="min-h-screen bg-lime-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* SSG Indicator */}
                    <div className="mb-6 bg-lime-400 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-lime-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-lime-900">Static Site Generation (SSG) with generateStaticParams</h3>
                                <p className="text-lime-800 mt-1">Category pages are pre-generated at build time for maximum performance</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-8 bg-lime-100 rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-lime-800">SSG Product Categories</h1>
                        <p className="mt-2 text-lime-800">
                            Browse pre-generated category pages built with generateStaticParams
                        </p>
                        <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-lime-800">
                                <span className="font-semibold">How it works:</span> All {categories.length} category pages are pre-generated at build time using <code className="bg-gray-100 px-2 py-1 rounded">generateStaticParams()</code>
                            </p>
                        </div>
                    </div>

                    {formattedCategories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {formattedCategories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={category.url}
                                    className="group"
                                >
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group-hover:scale-105">
                                        {/* Category Image Placeholder */}
                                        <div className="relative h-48 bg-gradient-to-br from-lime-500 to-lime-600">
                                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                                                <div className="text-center text-lime-800">
                                                    <Image
                                                        src={`https://dummyjson.com/image/300x200/d9f99d/000000?text=${category.name}`}
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
                                                    <h2 className="text-xl font-semibold text-gray-900 mb-2 capitalize group-hover:text-lime-700 transition-colors duration-300">
                                                        {category.name}
                                                    </h2>
                                                    <p className="text-sm text-gray-500 mb-4">
                                                        Slug: {category.slug}
                                                    </p>
                                                    <div className="flex items-center text-xs text-lime-800 bg-lime-200 px-2 py-1 rounded-full w-fit">
                                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        Pre-generated
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <span className="text-lime-700 font-medium group-hover:text-lime-800 transition-colors duration-300">
                                                    Browse Products
                                                </span>
                                                <svg className="w-5 h-5 text-lime-600 group-hover:text-lime-800 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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



                    <div className="mt-8 text-center text-lime-800">
                        <p>Showing {formattedCategories.length} pre-generated category pages</p>
                    </div>
                </div>
            </div>
        </>
    )
}