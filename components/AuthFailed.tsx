'use client';

import Link from 'next/link';

export default function AuthFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">Authentication Failed</h1>
        <p className="text-gray-600 mb-6">
            Invalid credentials try to signup or check username and password
        </p>
        <Link
          href="/login"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
