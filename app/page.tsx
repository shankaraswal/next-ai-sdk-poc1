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

          <div className="grid md:grid-cols-2 gap-8">
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
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Differences</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-600 mb-2">Direct API Call (Ex1)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Client-side data fetching</li>
                  <li>• Direct external API calls</li>
                  <li>• Simple implementation</li>
                  <li>• Exposed API endpoints</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-600 mb-2">API Route Handler (Ex2)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Server-side data processing</li>
                  <li>• Hidden external dependencies</li>
                  <li>• Built-in caching & error handling</li>
                  <li>• Better security & performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
