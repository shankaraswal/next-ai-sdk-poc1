import Header from './components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Next.js Data Fetching Patterns
            </h1>
            <p className="text-xl text-gray-600">
              Explore different approaches to data fetching in Next.js applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
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
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-amber-500">
                <div className="flex items-center mb-4">
                  <div className="bg-amber-100 rounded-full p-3">
                    <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 ml-3">Ex3 - Server Component</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Server component with ISR (Incremental Static Regeneration) for
                  optimal performance, SEO, and automatic data revalidation.
                </p>
                <div className="flex items-center text-amber-600 group-hover:text-amber-700">
                  <span className="text-sm font-medium">View Example</span>
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/ui/ex4" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-orange-500">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 ml-3">Ex4 - SSG with Static Params</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Static Site Generation with generateStaticParams for pre-built category pages.
                  Ultimate performance with build-time generation.
                </p>
                <div className="flex items-center text-orange-600 group-hover:text-orange-700">
                  <span className="text-sm font-medium">View Example</span>
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Approach Features & Benefits</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">Direct API Call (Ex1)</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Best for:</span>
                      <span className="text-gray-600 ml-2">Real-time data, simple prototypes</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Key Features:</span>
                      <ul className="text-gray-600 mt-2 space-y-1 ml-4">
                        <li>• Immediate data updates</li>
                        <li>• Simple implementation</li>
                        <li>• Interactive loading states</li>
                        <li>• Client-side control</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-amber-500 pl-6">
                  <h4 className="text-lg font-semibold text-amber-700 mb-3">Server Component (Ex3)</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Best for:</span>
                      <span className="text-gray-600 ml-2">SEO, performance, static content</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Key Features:</span>
                      <ul className="text-gray-600 mt-2 space-y-1 ml-4">
                        <li>• Zero client-side JavaScript</li>
                        <li>• Automatic revalidation (ISR)</li>
                        <li>• Optimal SEO & performance</li>
                        <li>• CDN-friendly static generation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-lg font-semibold text-purple-600 mb-3">API Route Handler (Ex2)</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Best for:</span>
                      <span className="text-gray-600 ml-2">Secure data processing, API abstraction</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Key Features:</span>
                      <ul className="text-gray-600 mt-2 space-y-1 ml-4">
                        <li>• Server-side security</li>
                        <li>• Built-in caching & error handling</li>
                        <li>• Hidden external dependencies</li>
                        <li>• Flexible data transformation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="text-lg font-semibold text-orange-600 mb-3">SSG with Static Params (Ex4)</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Best for:</span>
                      <span className="text-gray-600 ml-2">Known routes, maximum performance</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Key Features:</span>
                      <ul className="text-gray-600 mt-2 space-y-1 ml-4">
                        <li>• Pre-generated at build time</li>
                        <li>• Lightning-fast page loads</li>
                        <li>• Perfect SEO optimization</li>
                        <li>• CDN-ready static files</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-50 to-amber-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-medium text-gray-900">Feature</th>
                    <th className="text-center py-2 px-3 font-medium text-blue-600">Ex1 (Client)</th>
                    <th className="text-center py-2 px-3 font-medium text-purple-600">Ex2 (API Route)</th>
                    <th className="text-center py-2 px-3 font-medium text-amber-700">Ex3 (Server)</th>
                    <th className="text-center py-2 px-3 font-medium text-orange-600">Ex4 (SSG)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Initial Load Speed</td>
                    <td className="text-center py-2 px-3">⚡ Fast</td>
                    <td className="text-center py-2 px-3">⚡ Fast</td>
                    <td className="text-center py-2 px-3">🚀 Fastest</td>
                    <td className="text-center py-2 px-3">⚡ Instant</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">SEO Optimization</td>
                    <td className="text-center py-2 px-3">❌ Poor</td>
                    <td className="text-center py-2 px-3">❌ Poor</td>
                    <td className="text-center py-2 px-3">✅ Excellent</td>
                    <td className="text-center py-2 px-3">✅ Perfect</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Bundle Size</td>
                    <td className="text-center py-2 px-3">📦 Medium</td>
                    <td className="text-center py-2 px-3">📦 Medium</td>
                    <td className="text-center py-2 px-3">📦 Smallest</td>
                    <td className="text-center py-2 px-3">📦 Minimal</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Caching Strategy</td>
                    <td className="text-center py-2 px-3">🔄 Browser only</td>
                    <td className="text-center py-2 px-3">🔄 Server + Browser</td>
                    <td className="text-center py-2 px-3">🔄 ISR + CDN</td>
                    <td className="text-center py-2 px-3">🔄 Static + CDN</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Data Freshness</td>
                    <td className="text-center py-2 px-3">🔴 Real-time</td>
                    <td className="text-center py-2 px-3">🔴 Real-time</td>
                    <td className="text-center py-2 px-3">🟡 Periodic</td>
                    <td className="text-center py-2 px-3">🟡 Build-time</td>
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
