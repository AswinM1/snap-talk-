import React from "react";
import { useUser } from "@clerk/clerk-react";

const Profile = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <div className="text-white text-center mt-20">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-white rounded-xl shadow-md p-6 mt-10 border border-gray-600">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.imageUrl}
          alt="User"
          className="w-24 h-24 rounded-full border-2 border-violet-600"
        />
        <h2 className="text-2xl font-semibold">{user.fullName || "No Name"}</h2>
        <p className="text-gray-400">{user.primaryEmailAddress?.emailAddress || "No Email"}</p>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4">
        <h3 className="text-lg font-medium mb-4 text-center">User Details</h3>
        <div className="flex flex-col items-center gap-4">
          <ul className="text-gray-300 space-y-1 text-xl text-center">
            <li><strong>ID:</strong> {user.id}</li>
            <li><strong>First Name:</strong> {user.firstName || "N/A"}</li>
            <li><strong>Last Name:</strong> {user.lastName || "N/A"}</li>
            <li><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</li>
          </ul>
          <button className="bg-violet-600 px-10 py-3 mt-3 rounded-full hover:bg-violet-700 transition">
            Add tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
