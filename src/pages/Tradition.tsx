import { Link } from 'react-router-dom';
import PassagePyramid from '../components/PassagePyramid';

export default function Tradition() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button - Fixed position */}
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 bg-white shadow-lg rounded-lg p-2 text-gray-600 hover:text-gray-800 transition-colors"
        aria-label="Back to Today"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>
      
      <div className="w-full max-w-7xl mx-auto min-h-screen">
        {/* Mobile Header - only show on small screens */}
        <div className="md:hidden bg-primary-600 text-white p-4">
          <h1 className="text-xl font-semibold">Tradition</h1>
          <p className="text-primary-100 text-sm">Our shared creed and passage pyramid</p>
        </div>

        {/* PassagePyramid Component - takes full width and height */}
        <div className="w-full h-screen md:h-screen">
          <PassagePyramid
            stroke="#2563eb"
            innerStroke="#64748b"
            textColor="#0f172a"
            accent="#2563eb"
          />
        </div>
      </div>
    </div>
  );
}