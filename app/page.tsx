import Header from './components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Product Demo Application
            </h1>
            <p className="text-xl text-gray-600">
              Compare different API fetching approaches in Next.js
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/ui/ex1" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 ml-3">Ex1 - Direct API Call</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Fetches product data directly from external API on the client side.
                  Simple approach with client-side data fetching.
                </p>
                <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                  <span className="text-sm font-medium">View Example</span>
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/ui/ex2" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12l4-4m-4 4l4 4" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 ml-3">Ex2 - API Route Handler</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Uses Next.js API routes for server-side data fetching with caching,
                  error handling, and better performance optimization.
                </p>
                <div className="flex items-center text-purple-600 group-hover:text-purple-700">
                  <span className="text-sm font-medium">View Example</span>
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/ui/ex3" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 ml-3">Ex3 - Server Component</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Server component with ISR (Incremental Static Regeneration) for
                  optimal performance, SEO, and automatic data revalidation.
                </p>
                <div className="flex items-center text-green-600 group-hover:text-green-700">
                  <span className="text-sm font-medium">View Example</span>
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approach Features & Benefits</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-blue-600 mb-3">Direct API Call (Ex1)</h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Best for:</span>
                    <span className="text-gray-600 ml-1">Real-time data, simple prototypes</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Features:</span>
                    <ul className="text-gray-600 mt-1 space-y-1">
                      <li>• Immediate data updates</li>
                      <li>• Simple implementation</li>
                      <li>• Interactive loading states</li>
                      <li>• Client-side control</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-purple-600 mb-3">API Route Handler (Ex2)</h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Best for:</span>
                    <span className="text-gray-600 ml-1">Secure data processing, API abstraction</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Features:</span>
                    <ul className="text-gray-600 mt-1 space-y-1">
                      <li>• Server-side security</li>
                      <li>• Built-in caching & error handling</li>
                      <li>• Hidden external dependencies</li>
                      <li>• Flexible data transformation</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-green-600 mb-3">Server Component (Ex3)</h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Best for:</span>
                    <span className="text-gray-600 ml-1">SEO, performance, static content</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Features:</span>
                    <ul className="text-gray-600 mt-1 space-y-1">
                      <li>• Zero client-side JavaScript</li>
                      <li>• Automatic revalidation (ISR)</li>
                      <li>• Optimal SEO & performance</li>
                      <li>• CDN-friendly static generation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-medium text-gray-900">Feature</th>
                    <th className="text-center py-2 px-3 font-medium text-blue-600">Ex1 (Client)</th>
                    <th className="text-center py-2 px-3 font-medium text-purple-600">Ex2 (API Route)</th>
                    <th className="text-center py-2 px-3 font-medium text-green-600">Ex3 (Server)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Initial Load Speed</td>
                    <td className="text-center py-2 px-3">⚡ Fast</td>
                    <td className="text-center py-2 px-3">⚡ Fast</td>
                    <td className="text-center py-2 px-3">🚀 Fastest</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">SEO Optimization</td>
                    <td className="text-center py-2 px-3">❌ Poor</td>
                    <td className="text-center py-2 px-3">❌ Poor</td>
                    <td className="text-center py-2 px-3">✅ Excellent</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Bundle Size</td>
                    <td className="text-center py-2 px-3">📦 Medium</td>
                    <td className="text-center py-2 px-3">📦 Medium</td>
                    <td className="text-center py-2 px-3">📦 Smallest</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Caching Strategy</td>
                    <td className="text-center py-2 px-3">🔄 Browser only</td>
                    <td className="text-center py-2 px-3">🔄 Server + Browser</td>
                    <td className="text-center py-2 px-3">🔄 ISR + CDN</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Data Freshness</td>
                    <td className="text-center py-2 px-3">🔴 Real-time</td>
                    <td className="text-center py-2 px-3">🔴 Real-time</td>
                    <td className="text-center py-2 px-3">🟡 Periodic</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
