import React from 'react'
import Link from 'next/link'
import Header from '../../../../components/Header'
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
    tags: string[]
    weight: number
    dimensions: {
        width: number
        height: number
        depth: number
    }
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Array<{
        rating: number
        comment: string
        date: string
        reviewerName: string
        reviewerEmail: string
    }>
    returnPolicy: string
    minimumOrderQuantity: number
}

// Fetch product details
async function fetchProductDetails(id: string): Promise<Product | null> {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            // Enable ISR - static generation with revalidation
            next: { revalidate: 3600 } // Revalidate every hour
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const product = await response.json()
        return product
    } catch (error) {
        console.error('Failed to fetch product details:', error)
        return null
    }
}

interface PageProps {
    params: Promise<{
        category: string
        id: string
    }>
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { category, id } = await params
    const product = await fetchProductDetails(id)

    if (!product) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-orange-50 py-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center py-12">
                            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-4.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Not Found</h3>
                                <p className="text-gray-600">The requested product could not be found.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // Format category name for display
    const categoryDisplayName = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    return (
        <>
            <Header />
            <div className="min-h-screen bg-orange-50 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* SSG Indicator */}
                    <div className="mb-6 bg-orange-800 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-white">SSG Product Detail Page</h3>
                                <p className="text-orange-100 mt-1">Product details fetched server-side with ISR caching</p>
                            </div>
                        </div>
                    </div>

                    {/* Breadcrumb */}
                    <nav className="flex mb-6" aria-label="Breadcrumb">
                        <div className="flex items-center space-x-2 text-sm">
                            <Link href="/" className="text-orange-600 hover:text-orange-800 font-medium">
                                Home
                            </Link>
                            <span className="text-gray-400">/</span>
                            <Link href="/ui/ex4" className="text-orange-600 hover:text-orange-800 font-medium">
                                Categories
                            </Link>
                            <span className="text-gray-400">/</span>
                            <Link href={`/ui/ex4/${category}`} className="text-orange-600 hover:text-orange-800 font-medium">
                                {categoryDisplayName}
                            </Link>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-700 font-medium">{product.title}</span>
                        </div>
                    </nav>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-8 p-8">
                            {/* Product Images */}
                            <div className="space-y-4">
                                <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {product.discountPercentage > 0 && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md font-semibold">
                                            -{Math.round(product.discountPercentage)}% OFF
                                        </div>
                                    )}
                                </div>

                                {/* Additional Images */}
                                {product.images && product.images.length > 1 && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {product.images.slice(0, 4).map((image, index) => (
                                            <div key={index} className="relative h-20 bg-gray-100 rounded overflow-hidden">
                                                <Image
                                                    src={image}
                                                    alt={`${product.title} ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                                    <p className="text-gray-600 mb-4">{product.description}</p>

                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-gray-700 font-medium">{product.rating}</span>
                                            <span className="text-gray-500 ml-2">({product.reviews?.length || 0} reviews)</span>
                                        </div>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-gray-600">Brand: <span className="font-medium">{product.brand}</span></span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="flex items-baseline">
                                            <span className="text-4xl font-bold text-orange-600">${product.price}</span>
                                            {product.discountPercentage > 0 && (
                                                <span className="text-xl text-gray-500 line-through ml-3">
                                                    ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 10
                                                ? 'bg-green-100 text-green-800'
                                                : product.stock > 0
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                                        <div>
                                            <span className="font-medium">Weight:</span> {product.weight}g
                                        </div>
                                        <div>
                                            <span className="font-medium">Dimensions:</span> {product.dimensions?.width}×{product.dimensions?.height}×{product.dimensions?.depth}cm
                                        </div>
                                        <div>
                                            <span className="font-medium">Warranty:</span> {product.warrantyInformation}
                                        </div>
                                        <div>
                                            <span className="font-medium">Shipping:</span> {product.shippingInformation}
                                        </div>
                                    </div>

                                    {product.tags && product.tags.length > 0 && (
                                        <div className="mb-6">
                                            <span className="font-medium text-gray-700 mb-2 block">Tags:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {product.tags.map((tag, index) => (
                                                    <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-300">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        {product.reviews && product.reviews.length > 0 && (
                            <div className="border-t border-gray-200 p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                                <div className="space-y-4">
                                    {product.reviews.slice(0, 3).map((review, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center">
                                                    <span className="font-medium text-gray-900">{review.reviewerName}</span>
                                                    <div className="flex items-center ml-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}