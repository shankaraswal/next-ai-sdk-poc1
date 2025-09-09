'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Header from '../../components/Header'

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

interface ProductsResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
}

function Page() {
    const [data, setData] = useState<ProductsResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch('https://dummyjson.com/products?limit=24')
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                const result: ProductsResponse = await res.json()
                setData(result)
            } catch (err) {
                console.error(err)
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading products...</p>
                    </div>
                </div>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading products</h3>
                                <p className="mt-1 text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* API Method Indicator */}
                    <div className="mb-6 bg-blue-800 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-white">Direct API Call</h3>
                                <p className="text-blue-100 mt-1">This component fetches data directly from external API (dummyjson.com) on the client side</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
                        <p className="mt-2 text-gray-600">Discover our amazing collection of products</p>
                    </div>

                    {data && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="aspect-w-16 aspect-h-9">
                                        <Image
                                            src={product.thumbnail}
                                            alt={product.title}
                                            width={400}
                                            height={192}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                {product.category}
                                            </span>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                                            </div>
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {product.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-2xl font-bold text-gray-900">
                                                    ${product.price}
                                                </span>
                                                {product.discountPercentage > 0 && (
                                                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                                                        -{product.discountPercentage}%
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                Stock: {product.stock}
                                            </span>
                                        </div>
                                        {product.brand && (
                                            <p className="text-sm text-gray-500 mt-2">
                                                Brand: {product.brand}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {data && (
                        <div className="mt-8 text-center text-gray-600">
                            <p>Showing {data.products.length} of {data.total} products</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Page