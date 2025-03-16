import React, { useState, useEffect } from 'react';

const GiftCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const giftIdeas = [
    {
      title: "Personalized Photo Album",
      description: "Curate your favorite memories together in a beautifully crafted photo album.",
      price: "$35-60",
      image: "/api/placeholder/400/300",
      alt: "Personalized photo album"
    },
    {
      title: "Custom Star Map",
      description: "A map of the stars as they appeared at a special moment in your relationship.",
      price: "$50-100",
      image: "/api/placeholder/400/300",
      alt: "Custom star map poster"
    },
    {
      title: "Romantic Cooking Class",
      description: "Learn to make delicious meals together with a couples cooking class.",
      price: "$80-150",
      image: "/api/placeholder/400/300",
      alt: "Couple taking a cooking class"
    },
    {
      title: "Personalized Jewelry",
      description: "A custom piece with initials, coordinates, or a special date.",
      price: "$75-200",
      image: "/api/placeholder/400/300",
      alt: "Personalized necklace"
    },
    {
      title: "Weekend Getaway",
      description: "A short trip to a cozy B&B or boutique hotel for quality time together.",
      price: "$200-500",
      image: "/api/placeholder/400/300",
      alt: "Romantic cabin getaway"
    }
  ];

  const goToNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prevIndex) => (prevIndex + 1) % giftIdeas.length);
    }
  };

  const goToPrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prevIndex) => (prevIndex - 1 + giftIdeas.length) % giftIdeas.length);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning && index !== activeIndex) {
      setIsTransitioning(true);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(transitionTimeout);
  }, [activeIndex]);

  // Auto advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const gift = giftIdeas[activeIndex];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pink-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-rose-600">
        💝 Romantic Gift Ideas 💝
      </h1>
      
      <div className="relative overflow-hidden rounded-lg shadow-md bg-white">
        <div className="relative aspect-w-16 aspect-h-9 h-64 md:h-80">
          <img
            src={gift.image}
            alt={gift.alt}
            className="absolute w-full h-full object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="text-white">
              <h2 className="text-xl font-bold mb-1">{gift.title}</h2>
              <p className="text-sm opacity-90 mb-1">{gift.description}</p>
              <span className="text-sm font-semibold bg-rose-500 px-2 py-1 rounded-full">
                {gift.price}
              </span>
            </div>
          </div>
        </div>
        
        <button 
          className="absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-rose-600 flex items-center justify-center shadow hover:bg-white"
          onClick={goToPrev}
        >
          ←
        </button>
        
        <button 
          className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-rose-600 flex items-center justify-center shadow hover:bg-white"
          onClick={goToNext}
        >
          →
        </button>
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        {giftIdeas.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? 'bg-rose-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GiftCarousel;