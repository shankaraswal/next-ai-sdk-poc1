'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Header from '../../../components/Header'

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

function Page() {
    const params = useParams()
    const [data, setData] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<string>('')

    useEffect(() => {
        const getData = async () => {
            if (!params.id) return

            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`/api/ex2/${params.id}`)
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                const result: Product = await res.json()
                setData(result)
                // Set the first image as default (thumbnail or first image in array)
                setSelectedImage(result.thumbnail)
            } catch (err) {
                console.error(err)
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [params.id])

    if (loading) {
        return (
            <>
                <div className="min-h-screen bg-purple-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading product...</p>
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
                                <h3 className="text-sm font-medium text-red-800">Error loading product</h3>
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
                                <h3 className="text-lg font-semibold text-white">Next.js Dynamic API Route Handler</h3>
                                <p className="text-purple-100 mt-1">This component fetches data through /api/ex2/[id] route with dynamic ID parameter</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
                    </div>

                    {data && (
                        <div className="max-w-7xl mx-auto">
                            {/* Main Product Section */}
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                                <div className="lg:flex">
                                    {/* Product Image Gallery */}
                                    <div className="lg:w-1/2">
                                        {/* Main Image */}
                                        <div className="relative h-96 lg:h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4">
                                            <Image
                                                src={selectedImage || data.thumbnail}
                                                alt={data.title}
                                                fill
                                                className="object-cover transition-all duration-300"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                        </div>

                                        {/* Thumbnail Gallery */}
                                        <div className="flex space-x-2 overflow-x-auto pb-2">
                                            {/* Thumbnail for main product image */}
                                            <button
                                                onClick={() => setSelectedImage(data.thumbnail)}
                                                className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === data.thumbnail
                                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <Image
                                                    src={data.thumbnail}
                                                    alt={`${data.title} thumbnail`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                />
                                            </button>

                                            {/* Thumbnails for additional images */}
                                            {data.images && data.images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedImage(image)}
                                                    className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === image
                                                        ? 'border-blue-500 ring-2 ring-blue-200'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <Image
                                                        src={image}
                                                        alt={`${data.title} - Image ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="80px"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="lg:w-1/2 p-8">
                                        {/* Header with Category and Rating */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full capitalize">
                                                {data.category}
                                            </span>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                    <span className="ml-1 text-lg font-semibold text-gray-700">{data.rating}</span>
                                                    <span className="ml-1 text-sm text-gray-500">({data.reviews.length} reviews)</span>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${data.availabilityStatus === 'In Stock'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {data.availabilityStatus}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title and Brand */}
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                            {data.title}
                                        </h1>
                                        {data.brand && (
                                            <p className="text-lg text-gray-600 mb-4">by {data.brand}</p>
                                        )}

                                        {/* Tags */}
                                        {data.tags && data.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {data.tags.map((tag, index) => (
                                                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Description */}
                                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                            {data.description}
                                        </p>

                                        {/* Price Section */}
                                        <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                                            <span className="text-4xl font-bold text-gray-900">
                                                ${data.price}
                                            </span>
                                            {data.discountPercentage > 0 && (
                                                <div className="flex flex-col">
                                                    <span className="text-lg text-green-600 bg-green-100 px-3 py-1 rounded-full font-semibold">
                                                        -{data.discountPercentage}% OFF
                                                    </span>
                                                    <span className="text-sm text-gray-500 line-through mt-1">
                                                        ${(data.price / (1 - data.discountPercentage / 100)).toFixed(2)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex space-x-4 mb-6">
                                            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                                                Add to Cart
                                            </button>
                                            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Minimum Order Quantity */}
                                        {data.minimumOrderQuantity > 1 && (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                                <p className="text-sm text-yellow-800">
                                                    <span className="font-semibold">Minimum Order:</span> {data.minimumOrderQuantity} units
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Product Details Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                                {/* Product Specifications */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Specifications
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">SKU:</span>
                                            <span className="font-medium">{data.sku}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Weight:</span>
                                            <span className="font-medium">{data.weight} oz</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Dimensions:</span>
                                            <span className="font-medium">
                                                {data.dimensions.width}&quot; × {data.dimensions.height}&quot; × {data.dimensions.depth}&quot;
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Stock:</span>
                                            <span className="font-medium">{data.stock} units</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Barcode:</span>
                                            <span className="font-medium text-sm">{data.meta.barcode}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping & Warranty */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        Shipping & Warranty
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-900">Shipping</p>
                                                <p className="text-sm text-gray-600">{data.shippingInformation}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-900">Warranty</p>
                                                <p className="text-sm text-gray-600">{data.warrantyInformation}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-900">Return Policy</p>
                                                <p className="text-sm text-gray-600">{data.returnPolicy}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* QR Code */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                        Product QR Code
                                    </h3>
                                    <div className="text-center">
                                        <div className="relative w-32 h-32 mx-auto mb-4">
                                            <Image
                                                src={data.meta.qrCode}
                                                alt="Product QR Code"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <p className="text-sm text-gray-600">Scan for quick access</p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Reviews */}
                            {data.reviews && data.reviews.length > 0 && (
                                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        Customer Reviews ({data.reviews.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {data.reviews.map((review, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center">
                                                        <div className="flex">
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
                                                        <span className="ml-2 text-sm font-medium text-gray-700">{review.rating}/5</span>
                                                    </div>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(review.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 mb-2">{review.comment}</p>
                                                <p className="text-sm text-gray-500">- {review.reviewerName}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Additional Images */}
                            {data.images && data.images.length > 0 && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Product Gallery
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {data.images.map((image, index) => (
                                            <div key={index} className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                                <Image
                                                    src={image}
                                                    alt={`${data.title} - Image ${index + 1}`}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Page