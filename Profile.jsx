import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { getNovels } from 'wasp/client/operations';

const ProfilePage = () => {
  const { data: novels, isLoading, error } = useQuery(getNovels);
  const user = { username: 'John Doe', email: 'johndoe@example.com', age: 30 }; // Replace with actual user data retrieval logic

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4">
        <h2 className="text-xl">User Information</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl">My Novels</h2>
        {novels.map((novel) => (
          <div key={novel.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
            <h3 className="text-lg font-bold">{novel.title}</h3>
            <p><strong>Author:</strong> {novel.author}</p>
            <p><strong>Genre:</strong> {novel.genre}</p>
            <img src={novel.coverPage} alt="Cover Page" className="w-full h-48 object-cover mt-2" />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link 
          to="/create-novel"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Novel
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
