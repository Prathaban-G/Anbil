import React, { useState, useEffect } from 'react';

const LoveLetter = () => {
  const [letter, setLetter] = useState('');
  const [date, setDate] = useState('');
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isPreview) {
      setShowAnimation(true);
      const timer = setTimeout(() => setShowAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isPreview]);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-pink-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-rose-600">
        💌 Love Letter Creator 💌
      </h1>

      {!isPreview ? (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">To:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-rose-300"
              placeholder="Recipient's name"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Date:</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-rose-300"
              placeholder={getCurrentDate()}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Your Love Letter:</label>
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="w-full h-64 p-4 border rounded focus:ring-2 focus:ring-rose-300"
              placeholder="Write your heartfelt message here..."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">From:</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-rose-300"
              placeholder="Your name"
            />
          </div>
        </div>
      ) : (
        <div 
          className={`bg-white p-8 rounded-lg shadow-md transform transition-transform duration-500 ${
            showAnimation ? 'scale-105' : 'scale-100'
          }`}
        >
          <div className="font-serif space-y-4">
            <div className="text-right text-gray-600">
              {date || getCurrentDate()}
            </div>
            
            <div className="text-xl text-gray-800">
              Dear {recipient || "My Love"},
            </div>

            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed min-h-64">
              {letter || "Your letter content will appear here..."}
            </div>

            <div className="text-right mt-8 text-xl text-gray-800">
              With love,<br />
              {sender || "Your Name"}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={togglePreview}
          className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors duration-300"
        >
          {isPreview ? "Edit Letter" : "Preview Letter"}
        </button>
      </div>
    </div>
  );
};

export default LoveLetter;