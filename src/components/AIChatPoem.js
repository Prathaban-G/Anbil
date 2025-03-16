import React, { useState } from "react";

const AIChatPoem = () => {
  const [userName, setUserName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [favoriteThing, setFavoriteThing] = useState("");
  const [mood, setMood] = useState("");
  const [poem, setPoem] = useState("");
  const [loading, setLoading] = useState(false);

  // Sample poems for demonstration
  const poems = [
    "Under starlit skies we dance,\nOur hearts beating in sweet romance.\nWith every step, our love grows strong,\nLike a gentle, endless song.",
    "Like sunrise painting morning sky,\nYour love makes my spirit fly.\nIn quiet moments, soft and true,\nMy heart beats only just for you.",
    "Through seasons changing, year by year,\nOur love remains forever dear.\nLike flowers blooming in the spring,\nJoy to both our hearts you bring."
  ];

  const generatePoem = () => {
    setLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      const randomPoem = poems[Math.floor(Math.random() * poems.length)]
        .replace(/\n/g, '<br>')
        .replace(/love/g, `love for ${partnerName}`)
        .replace(/hearts?/g, `heart`);
      setPoem(randomPoem);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4 bg-pink-50 text-center rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">💕 AI-Powered Love Poem Generator 💕</h2>
      
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          className="p-2 border rounded w-full"
        />
        <input 
          type="text" 
          placeholder="Partner's Name" 
          value={partnerName} 
          onChange={(e) => setPartnerName(e.target.value)} 
          className="p-2 border rounded w-full"
        />
        <input 
          type="text" 
          placeholder="Favorite Thing (e.g., long walks)" 
          value={favoriteThing} 
          onChange={(e) => setFavoriteThing(e.target.value)} 
          className="p-2 border rounded w-full"
        />
        <input 
          type="text" 
          placeholder="Mood (e.g., passionate, sweet)" 
          value={mood} 
          onChange={(e) => setMood(e.target.value)} 
          className="p-2 border rounded w-full"
        />
      </div>

      <button 
        onClick={generatePoem} 
        disabled={loading}
        className="bg-red-500 text-white p-3 rounded mt-6 hover:bg-red-600 disabled:bg-red-300"
      >
        {loading ? "Generating..." : "Generate Poem"}
      </button>

      {poem && (
        <div className="mt-6 p-4 bg-white border rounded shadow">
          <h3 className="font-bold text-xl mb-2">Your Love Poem 💘</h3>
          <p 
            className="text-gray-700" 
            dangerouslySetInnerHTML={{ __html: poem }}
          />
        </div>
      )}
    </div>
  );
};

export default AIChatPoem;