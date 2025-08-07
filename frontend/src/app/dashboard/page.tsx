"use client";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Dashboard</h1>
      {session ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <p className="text-gray-900 text-lg">{session.user.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <p className="text-gray-900 text-lg">{session.user.email}</p>
          </div>

          <button
            onClick={async () => await signOut()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Out
          </button>
        </div>
      ) : (
          <p className="text-center text-gray-600 ">Loading...
          </p>
      )}
    </div>
  );
}
