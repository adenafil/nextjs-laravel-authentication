import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Welcome</h1>
        <p className="mt-2 text-lg text-gray-600">
          Please login or register to continue.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/login">
            <div className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Login
            </div>
          </Link>
          <Link href="/register">
            <div className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
              Register
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
