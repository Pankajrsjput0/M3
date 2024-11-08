import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getNovels } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // carousel styles
import { Carousel } from 'react-responsive-carousel';

const HomePage = () => {
  const { data: novels, isLoading, error } = useQuery(getNovels);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const genres = [
    { name: 'Fantasy', img: 'https://images.app.goo.gl/YaFgac1tbx48vpVe9' },
    { name: 'Horror', img: 'https://images.app.goo.gl/PNFkqMVYA28Sj3QQ7' },
    { name: 'Mystery', img: 'https://images.app.goo.gl/8RXi5jjRg1gXpxKFA' },
    { name: 'Adventure', img: 'https://images.app.goo.gl/sbo4Ar2WsEEwAaGb6' },
    { name: 'Romance', img: 'https://images.app.goo.gl/gRk3ocrzm7ozQeaL7' },
    { name: 'Sci-Fi', img: 'https://images.app.goo.gl/SQVMpLYhniWDkNNF9' }
  ];

  return (
    <div className="container mx-auto p-4">
      <img src="https://images.app.goo.gl/CP3wSZ5V3VVbC1ZYA" alt="Logo" className="h-24 mx-auto" />
      <h1 className="text-center text-3xl font-bold my-4">Welcome to Kalinovels</h1>
      <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
        {genres.map((genre, index) => (
          <div key={index} className="p-4">
            <img src={genre.img} alt={genre.name} className="h-64 w-full object-cover" />
            <p className="legend">{genre.name}</p>
          </div>
        ))}
      </Carousel>
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Available Novels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {novels.map((novel) => (
            <div key={novel.id} className="bg-white p-4 rounded shadow-md hover:shadow-lg">
              <img src={novel.coverPage || 'https://via.placeholder.com/150'} alt={novel.title} className="h-48 w-full object-cover mb-4" />
              <h3 className="text-xl font-bold">{novel.title}</h3>
              <p className="text-gray-600">by {novel.author}</p>
              <p className="mt-2 text-gray-700">{novel.story}</p>
              <Link to={`/novel/${novel.id}`} className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
