export default function Tradition() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-primary-600 text-white p-4">
          <h1 className="text-xl font-semibold">Tradition</h1>
          <p className="text-primary-100 text-sm">Our shared creed and passage pyramid</p>
        </div>

        <div className="p-4">
          {/* Tradition Component Placeholder */}
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="text-gray-600 space-y-4">
              <div className="text-6xl">📜</div>
              <h2 className="text-xl font-semibold text-gray-800">Tradition Component</h2>
              <p className="text-sm">
                The Passage Pyramid component will be mounted here. 
                This component displays our shared creed and helps members 
                memorize the 40 foundational Bible passages.
              </p>
              <div className="mt-6 p-4 bg-white rounded border-l-4 border-primary-600">
                <p className="text-xs text-gray-600 italic">
                  To integrate your Passage Pyramid component, replace this 
                  placeholder with your React component import.
                </p>
              </div>
            </div>
          </div>

          {/* Temporary Sample Content */}
          <div className="mt-6 space-y-4">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Sample Tradition Statement</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We are men called to live with purpose, walking in faith, 
                strengthening one another, and serving our communities with 
                the love of Christ. Through mentorship and brotherhood, we 
                grow together in wisdom and spiritual maturity.
              </p>
            </div>
            
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Passage Categories</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-yellow-50 p-2 rounded">Faith</div>
                <div className="bg-blue-50 p-2 rounded">Wisdom</div>
                <div className="bg-green-50 p-2 rounded">Service</div>
                <div className="bg-purple-50 p-2 rounded">Brotherhood</div>
                <div className="bg-red-50 p-2 rounded">Purpose</div>
                <div className="bg-gray-50 p-2 rounded">Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}