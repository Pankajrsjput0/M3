import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getNovels } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const MyNovelsPage = () => {
  const { data: novels, isLoading, error } = useQuery(getNovels);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>My Novels</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {novels.map((novel) => (
          <div key={novel.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
            {novel.coverPage ? (
              <img src={novel.coverPage} alt={novel.title} className='w-full h-48 object-cover'/>
            ) : (
              <div className='w-full h-48 flex items-center justify-center bg-gray-200'>
                <span className='text-gray-500'>{novel.title} by {novel.author}</span>
              </div>
            )}
            <div className='p-4'>
              <h2 className='text-xl font-bold'>{novel.title}</h2>
              <p className='text-sm text-gray-600'>{novel.genre}</p>
              <p className='mt-2 text-gray-700'>{novel.story}</p>
              <Link to={`/novel/${novel.id}`} className='text-blue-500 hover:underline'>Read more</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyNovelsPage;
