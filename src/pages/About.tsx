export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-primary-600 text-white p-4">
          <h1 className="text-xl font-semibold">About & Privacy</h1>
          <p className="text-primary-100 text-sm">Learn about the app and data handling</p>
        </div>

        <div className="p-4 space-y-6">
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">About This App</h2>
            
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                This is a Christian men's mentorship application built around the 
                "triad" model - a five-role mentorship system designed to foster 
                spiritual growth and brotherhood.
              </p>
              
              <p>
                The app provides daily guidance through the M.A.N. (Morning, Afternoon, Night) 
                rhythm, helping you stay connected to your faith and your brothers in Christ.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h3 className="font-medium text-blue-800 mb-1">The Five Roles</h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li><strong>Steward:</strong> Guides and oversees the triad</li>
                  <li><strong>Mentor:</strong> Leads and teaches the mentee</li>
                  <li><strong>Mentee:</strong> Learns and grows under guidance</li>
                  <li><strong>Scout:</strong> Prepares to become mentee next quarter</li>
                  <li><strong>Pre-Scout:</strong> Observes and prepares to enter</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Privacy & Data</h2>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h3 className="font-medium text-green-800 mb-2">✓ What we DO</h3>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>Store all data locally in your browser</li>
                  <li>Work completely offline</li>
                  <li>Let you share data via QR codes</li>
                  <li>Respect your privacy completely</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h3 className="font-medium text-red-800 mb-2">✗ What we DON'T do</h3>
                <ul className="text-xs text-red-700 space-y-1">
                  <li>Send any data to external servers</li>
                  <li>Track your activity or behavior</li>
                  <li>Require sign-in or accounts</li>
                  <li>Share your information with anyone</li>
                </ul>
              </div>
              
              <p className="text-xs text-gray-500 italic">
                Your data belongs to you. The app works entirely in your browser 
                and never communicates with external servers.
              </p>
            </div>
          </div>

          {/* Technical Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Technical Details</h2>
            
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>App Type:</span>
                <span>Progressive Web App (PWA)</span>
              </div>
              <div className="flex justify-between">
                <span>Storage:</span>
                <span>Local IndexedDB</span>
              </div>
              <div className="flex justify-between">
                <span>Connectivity:</span>
                <span>Offline-first</span>
              </div>
              <div className="flex justify-between">
                <span>Framework:</span>
                <span>React + TypeScript</span>
              </div>
              <div className="flex justify-between">
                <span>Version:</span>
                <span>1.0.0</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900">Contact & Support</h2>
            
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                For questions about the mentorship program or technical support, 
                please contact your local triad steward or program coordinator.
              </p>
              
              <p className="text-xs text-gray-500">
                This app is designed to work independently without external support, 
                but human guidance and fellowship remain essential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}