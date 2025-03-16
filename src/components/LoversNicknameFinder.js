import React, { useState, useEffect } from 'react';

const funnyNicknames = [
  "Puffin",
  "Muffin",
  "Cupcake",
  "Pudding",
  "Sprinkles",
  "Dumpling",
  "Tatertot",
  "Peaches",
  "Princess",
  "Bubblegum", 
  "Pudding Pie",
  "Puppy Face",
  "Sweet Tea",
  "Buttercup",
  "Dream Girl",
  "Love Bug",
  "Sunshine",
  "Sweetheart",
  "Precious",
  "Darling",
  "Angel",
  "Shug",
  "Shuggy",
  "Doll",
  "Hon'",
  "Honey Bunch",
  "Honey Bunches",
  "Honey Bunny",
  "Sweets",
  "Sweetie",
  "Baby",
  "Cutie",
  "Angel Eyes",
  "Blossom",
  "Baby Doll",
  "Babe",
  "Love",
  "Beautiful",
  "Good-looking",
  "Handsome",
  "Beau",
  "PIC",
  "Dream Boat",
  "Gorgeous",
  "Lovely",
  "Boo",
  "Pookie",
  "Lovebug"
];

const LoveFlamesNicknameGenerator = () => {
  const [lover1, setLover1] = useState("");
  const [lover2, setLover2] = useState("");
  const [nickname, setNickname] = useState(null);
  const [flames, setFlames] = useState([]);
  
  useEffect(() => {
    const newFlames = [];
    for (let i = 0; i < 15; i++) {
      newFlames.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        scale: 0.5 + Math.random() * 1
      });
    }
    setFlames(newFlames);
  }, []);

  const generateNickname = () => {
    if (lover1 && lover2) {
      const randomNick = funnyNicknames[Math.floor(Math.random() * funnyNicknames.length)];
      setNickname(`${lover1} & ${lover2} are now... ${randomNick}! 💖`);
    } else {
      setNickname("Please enter both names! 🙃");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto bg-gradient-to-b from-rose-800 to-pink-900 p-6 rounded-xl shadow-lg overflow-hidden">
      {/* Animated flames */}
      {flames.map((flame) => (
        <div
          key={flame.id}
          className="absolute bottom-0 animate-pulse"
          style={{
            left: `${flame.left}%`,
            animationDelay: `${flame.delay}s`,
            transform: `scale(${flame.scale})`,
            opacity: 0.6
          }}
        >
          <div className="h-12 w-6 bg-gradient-to-t from-amber-500 via-amber-300 to-rose-500 rounded-full blur-sm"></div>
        </div>
      ))}
      
      <div className="relative z-10 w-full">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Lovers Flame Nickname 💘</h2>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Lover 1"
            value={lover1}
            onChange={(e) => setLover1(e.target.value)}
            className="w-full p-2 rounded mb-3 bg-white/90 backdrop-blur-sm border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          
          <input
            type="text"
            placeholder="Lover 2"
            value={lover2}
            onChange={(e) => setLover2(e.target.value)}
            className="w-full p-2 rounded mb-4 bg-white/90 backdrop-blur-sm border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        
        <button
          onClick={generateNickname}
          className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-all transform hover:scale-105 shadow-md flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Generate Flaming Nickname
        </button>
        
        {nickname && (
          <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-rose-300 animate-pulse">
            <p className="text-lg font-semibold text-white text-center">{nickname}</p>
          </div>
        )}
      </div>
      
      {/* Decorative sparkles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-300 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-amber-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-amber-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default LoveFlamesNicknameGenerator;