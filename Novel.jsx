import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, getNovelDetails } from 'wasp/client/operations';

const NovelPage = () => {
  const { novelId } = useParams();
  const { data: novel, isLoading, error } = useQuery(getNovelDetails, { id: novelId });

  if (isLoading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{novel.title}</h1>
      <h2 className="text-xl font-semibold mb-2">by {novel.author}</h2>
      {novel.coverPage ? (
        <img src={novel.coverPage} alt="Cover" className="w-full max-h-64 object-cover mb-4"/>
      ) : (
        <div className="w-full max-h-64 bg-gray-200 flex items-center justify-center mb-4">
          <p className="text-gray-500">No Cover Image Available</p>
        </div>
      )}
      <p className="text-gray-700 mb-6">{novel.story}</p>
      <div className="border-t pt-4">
        <h3 className="text-2xl font-semibold mb-3">Chapters</h3>
        {novel.chapters.map(chapter => (
          <div key={chapter.id} className="mb-2">
            <h4 className="text-xl font-bold">Chapter {chapter.chapterNumber}: {chapter.title}</h4>
            <p className="text-sm text-gray-500">Uploaded on: {new Date(chapter.uploadDate).toLocaleDateString()}</p>
            <p className="text-gray-700 mt-1">{chapter.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NovelPage;
