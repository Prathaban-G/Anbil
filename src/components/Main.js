import React, { useState, useEffect } from 'react';
import AIChatPoem from './AIChatPoem';
import CardMaker from './CardMaker';
import GiftCarousel from './GiftCarousel';
import LoveFlames from './LoveFlames';
import LoveLetter from './LoveLetter';
import LoveQuiz from './LoveQuiz';
import LoversNicknameFinder from './LoversNicknameFinder';
import Footer from './Footer';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('LoveFlames');
  const [randomQuote, setRandomQuote] = useState('');

  const loveQuotes = [
    "Love is not about how many days, months, or years you have been together. It's all about how much you love each other every day.",
    "When I saw you, I was afraid to meet you. When I met you, I was afraid to kiss you. When I kissed you, I was afraid to love you. Now that I love you, I'm afraid to lose you.",
    "The best thing to hold onto in life is each other.",
    "I love you not only for what you are, but for what I am when I am with you.",
    "Love is composed of a single soul inhabiting two bodies.",
    "In all the world, there is no heart for me like yours.",
    "I've fallen in love many times... always with you.",
    "To love and be loved is to feel the sun from both sides.",
    "You are my today and all of my tomorrows.",
    "The greatest happiness of life is the conviction that we are loved."
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    setRandomQuote(loveQuotes[randomIndex]);
    
    // Change quote every 10 seconds
    const interval = setInterval(() => {
      const newIndex = Math.floor(Math.random() * loveQuotes.length);
      setRandomQuote(loveQuotes[newIndex]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const renderActiveComponent = () => {
    switch(activeComponent) {
      case 'AIChatPoem':
        return <AIChatPoem />;
      case 'CardMaker':
        return <CardMaker />;
      case 'GiftCarousel':
        return <GiftCarousel />;
      case 'LoveFlames':
        return <LoveFlames />;
      case 'LoveLetter':
        return <LoveLetter />;
      case 'LoveQuiz':
        return <LoveQuiz />;
      case 'LoversNicknameFinder':
        return <LoversNicknameFinder />;
      default:
        return <LoveFlames />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/public/back.svg)' }}>
      {/* Desktop Header */}
      <header className="hidden md:flex flex-col w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.svg" 
              alt="Anbil Logo" 
              className="h-12 w-12" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23FF69B4'/%3E%3Cpath d='M50 20C60 35 70 35 80 50C70 65 60 65 50 80C40 65 30 65 20 50C30 35 40 35 50 20Z' fill='%23FFF'/%3E%3C/svg%3E";
              }}
            />
       <h1 className="text-2xl font-bold">𝓐𝓷𝓫𝓲𝓵</h1>
          </div>
          <div className="italic text-lg font-light max-w-lg text-center">
            "{randomQuote}"
          </div>
        </div>
        
        <nav className="mt-4">
          <ul className="flex justify-around">
            <li 
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all ${activeComponent === 'LoveFlames' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('LoveFlames')}
            >
              Love Flames
            </li>
            <li 
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all ${activeComponent === 'LoveLetter' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('LoveLetter')}
            >
              Love Letter
            </li>
            <li 
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all ${activeComponent === 'LoveQuiz' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('LoveQuiz')}
            >
              Love Quiz
            </li>
            <li 
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all ${activeComponent === 'LoversNicknameFinder' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('LoversNicknameFinder')}
            >
              Nickname Finder
            </li>
            <li 
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all ${activeComponent === 'AIChatPoem' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('AIChatPoem')}
            >
              AI Chat Poem
            </li>
            <li 
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all ${activeComponent === 'CardMaker' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('CardMaker')}
            >
              Card Maker
            </li>
            
          </ul>
        </nav>
      </header>
      
      {/* Mobile Header */}
      <header className="md:hidden bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.svg" 
              alt="Anbil Logo" 
              className="h-8 w-8" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23FF69B4'/%3E%3Cpath d='M50 20C60 35 70 35 80 50C70 65 60 65 50 80C40 65 30 65 20 50C30 35 40 35 50 20Z' fill='%23FFF'/%3E%3C/svg%3E";
              }}
            />
 <h1 className="text-2xl font-bold">𝓐𝓷𝓫𝓲𝓵</h1>
          </div>
        </div>
        <div className="italic text-sm font-light mt-2 text-center">
          "{randomQuote}"
        </div>
        
        <nav className="mt-3 overflow-x-auto pb-1">
          <ul className="flex space-x-4 whitespace-nowrap">
            <li 
              className={`cursor-pointer px-3 py-1 rounded-lg transition-all ${activeComponent === 'LoveFlames' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('LoveFlames')}
            >
              Love Flames
            </li>
            <li 
              className={`cursor-pointer px-3 py-1 rounded-lg transition-all ${activeComponent === 'LoveLetter' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('LoveLetter')}
            >
              Love Letter
            </li>
            <li 
              className={`cursor-pointer px-3 py-1 rounded-lg transition-all ${activeComponent === 'LoveQuiz' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('LoveQuiz')}
            >
              Love Quiz
            </li>
            <li 
              className={`cursor-pointer px-3 py-1 rounded-lg transition-all ${activeComponent === 'LoversNicknameFinder' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('LoversNicknameFinder')}
            >
              Nicknames
            </li>
            <li 
              className={`cursor-pointer px-3 py-1 rounded-lg transition-all ${activeComponent === 'AIChatPoem' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('AIChatPoem')}
            >
              AI Poems
            </li>
            <li 
              className={`cursor-pointer px-3 py-1 rounded-lg transition-all ${activeComponent === 'CardMaker' ? 'bg-pink-700 font-bold' : 'hover:bg-pink-600'}`}
              onClick={() => setActiveComponent('CardMaker')}
            >
              Cards
            </li>
          </ul>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow p-4 bg-gradient-to-r from-pink-500 to-purple-600" >
        {renderActiveComponent()}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;