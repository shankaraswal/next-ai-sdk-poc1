'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'

// Type definitions
interface Review {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

interface Dimensions {
    width: number
    height: number
    depth: number
}

interface Meta {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
}

interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    dimensions: Dimensions
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Review[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: Meta
    images: string[]
    thumbnail: string
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
                const res = await fetch('/api/ex2')
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                const result: ProductsResponse = await res.json()
                console.log('API Response:', result)
                console.log('First product thumbnail:', result.products[0]?.thumbnail)
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
                <div className="min-h-screen bg-purple-50 flex items-center justify-center">
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
                <div className="min-h-screen bg-purple-50 flex items-center justify-center">
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
            <div className="min-h-screen bg-purple-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* API Method Indicator */}
                    <div className="mb-6 bg-purple-800 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12l4-4m-4 4l4 4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-white">Next.js API Route Handler</h3>
                                <p className="text-purple-100 mt-1">This component fetches data through /api/ex2 route with server-side processing</p>
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
                                <Link
                                    key={product.id}
                                    href={`/ui/ex2/${product.id}`}
                                    className="group"
                                >
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group-hover:scale-105">
                                        <div className="relative w-full h-48 bg-gray-200">
                                            <Image
                                                src={product.thumbnail}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:brightness-110 transition-all duration-300"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />

                                            <div className="absolute inset-0 hover:bg-black/10 bg-opacity group-hover:bg-opacity-0 transition-all duration-300 flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2">
                                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </div>
                                            </div>
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
                                            <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                                {product.title}
                                            </h2>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between mb-4">
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
                                                <p className="text-sm text-gray-500 mb-3">
                                                    Brand: {product.brand}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                                                    View Details
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