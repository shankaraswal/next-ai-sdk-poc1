import React from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'
import Image from 'next/image'

// Type definitions
interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

interface CategoryData {
    products: Product[]
    total: number
    skip: number
    limit: number
}

// Generate static params for all categories
export async function generateStaticParams() {
    try {
        // Fetch the category list from the API
        const response = await fetch('https://dummyjson.com/products/category-list')
        const categories: string[] = await response.json()

        // Return params for each category
        return categories.map((category) => ({
            category: category,
        }))
    } catch (error) {
        console.error('Failed to generate static params:', error)
        return []
    }
}

// Fetch products for a specific category
async function fetchCategoryProducts(category: string): Promise<CategoryData> {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}`, {
            // Enable ISR - static generation with revalidation
            next: { revalidate: 3600 } // Revalidate every hour
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Failed to fetch category products:', error)
        return {
            products: [],
            total: 0,
            skip: 0,
            limit: 0
        }
    }
}

interface PageProps {
    params: Promise<{
        category: string
    }>
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params
    const categoryData = await fetchCategoryProducts(category)

    // Format category name for display
    const categoryDisplayName = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    return (
        <>
            <Header />
            <div className="min-h-screen bg-orange-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* SSG Indicator */}
                    <div className="mb-6 bg-orange-800 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-white">Static Site Generation (SSG)</h3>
                                <p className="text-orange-100 mt-1">This page is pre-generated at build time using generateStaticParams</p>
                            </div>
                        </div>
                    </div>

                    {/* Breadcrumb */}
                    <nav className="flex mb-6" aria-label="Breadcrumb">
                        <div className="flex items-center space-x-2 text-sm">
                            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                                Home
                            </Link>
                            <span className="text-gray-400">/</span>
                            <Link href="/ui/ex4" className="text-orange-600 hover:text-orange-800 font-medium">
                                Categories
                            </Link>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-700 font-medium">{categoryDisplayName}</span>
                        </div>
                    </nav>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 capitalize">{categoryDisplayName}</h1>
                        <p className="mt-2 text-gray-600">
                            {categoryData.total > 0 ? `${categoryData.total} products found` : 'No products found'}
                        </p>
                    </div>

                    {categoryData.products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {categoryData.products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/ui/ex4/${category}/${product.id}`}
                                    className="group"
                                >
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105 cursor-pointer">
                                        <div className="relative h-48">
                                            <Image
                                                src={product.thumbnail}
                                                alt={product.title}
                                                fill
                                                className="object-cover"
                                            />
                                            {product.discountPercentage > 0 && (
                                                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                                                    -{Math.round(product.discountPercentage)}%
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                                                {product.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {product.description}
                                            </p>

                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center">
                                                    <span className="text-2xl font-bold text-orange-600">
                                                        ${product.price}
                                                    </span>
                                                    {product.discountPercentage > 0 && (
                                                        <span className="text-sm text-gray-500 line-through ml-2">
                                                            ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">{product.rating}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                                <span>Brand: {product.brand}</span>
                                                <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 10
                                                    ? 'bg-green-100 text-green-800'
                                                    : product.stock > 0
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-orange-600 font-medium group-hover:text-orange-700 transition-colors duration-300">
                                                    View Details
                                                </span>
                                                <svg className="w-4 h-4 text-orange-600 group-hover:text-orange-700 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
                                <p className="text-gray-600">No products available in this category.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}