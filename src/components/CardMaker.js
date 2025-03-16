import React, { useState, useRef, useEffect } from 'react';

const CardMaker = () => {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 200, y: 150 });
  const [selectedBackground, setSelectedBackground] = useState('#fce7f3');
  const [isDragging, setIsDragging] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [fontSize, setFontSize] = useState(24);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [useGradient, setUseGradient] = useState(false);
  const [gradientStartColor, setGradientStartColor] = useState('#fce7f3');
  const [gradientEndColor, setGradientEndColor] = useState('#e0f2fe');
  const [gradientDirection, setGradientDirection] = useState('to right');
  const [fontColor, setFontColor] = useState('#111827');

  const backgrounds = [
    { name: 'Pink', color: '#fce7f3' },
    { name: 'Red', color: '#fee2e2' },
    { name: 'Purple', color: '#f3e8ff' },
    { name: 'Blue', color: '#e0f2fe' },
  ];

  const fontColors = [
    { name: 'Black', color: '#111827' },
    { name: 'Dark Blue', color: '#1e3a8a' },
    { name: 'Red', color: '#dc2626' },
    { name: 'Purple', color: '#7e22ce' },
  ];

  const gradientDirections = [
    { name: 'Horizontal', value: 'to right' },
    { name: 'Vertical', value: 'to bottom' },
    { name: 'Diagonal ↘', value: 'to bottom right' },
    { name: 'Diagonal ↗', value: 'to top right' },
  ];

  useEffect(() => {
    drawCard();
  }, [text, textPosition, selectedBackground, hearts, fontSize, useGradient, gradientStartColor, gradientEndColor, gradientDirection, fontColor]);

  const drawCard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    if (useGradient) {
      const gradient = createCanvasGradient(ctx, canvas, gradientDirection, gradientStartColor, gradientEndColor);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = selectedBackground;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    // Draw hearts
    hearts.forEach(heart => {
      drawHeart(ctx, heart.x, heart.y, heart.size, heart.color);
    });

    // Draw multi-line text
    ctx.fillStyle = fontColor;
    ctx.font = `${fontSize}px cursive`;
    ctx.textAlign = 'center';
    
    // Split text by newline characters
    const lines = text.split('\n');
    const lineHeight = fontSize * 1.2; // Adjust line spacing
    
    lines.forEach((line, index) => {
      const y = textPosition.y + (index * lineHeight) - ((lines.length - 1) * lineHeight / 2);
      ctx.fillText(line, textPosition.x, y);
    });
  };

  const createCanvasGradient = (ctx, canvas, direction, startColor, endColor) => {
    let gradient;
    
    switch (direction) {
      case 'to right':
        gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        break;
      case 'to bottom':
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        break;
      case 'to bottom right':
        gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        break;
      case 'to top right':
        gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
        break;
      default:
        gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    }
    
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    
    return gradient;
  };

  const drawHeart = (ctx, x, y, size, color) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.scale(size, size);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-2, -2, -4, 2, 0, 4);
    ctx.bezierCurveTo(4, 2, 2, -2, 0, 0);
    ctx.closePath();
    
    ctx.fill();
    ctx.restore();
  };

  const addHeart = () => {
    const newHeart = {
      x: Math.random() * 350 + 25,
      y: Math.random() * 350 + 25,
      size: Math.random() * 2 + 1,
      color: '#ef4444'
    };
    setHearts([...hearts, newHeart]);
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTextPosition({ x, y });
  };

  const downloadCard = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'valentine-card.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pink-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-rose-600">
        💝 Valentine's Card Maker 💝
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onClick={handleCanvasClick}
            className="border rounded-lg shadow-md bg-white cursor-pointer"
          />
        </div>

        <div className="md:w-1/3 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Card Text:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border rounded h-24"
              placeholder="Enter your message..."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Font Size:</label>
            <input
              type="range"
              min="12"
              max="48"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 mb-2">Font Color:</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {fontColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setFontColor(color.color)}
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                />
              ))}
              <div className="w-full mt-1">
                <input 
                  type="color" 
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                  className="w-full h-8 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-gray-700">Background:</label>
              <button 
                onClick={toggleColorPicker}
                className="px-2 py-1 bg-rose-500 text-white rounded text-sm hover:bg-rose-600"
              >
                {showColorPicker ? 'Simple Mode' : 'Advanced Mode'}
              </button>
            </div>
            
            {!showColorPicker ? (
              <div className="flex gap-2">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.name}
                    onClick={() => {
                      setSelectedBackground(bg.color);
                      setUseGradient(false);
                    }}
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: bg.color }}
                    title={bg.name}
                  />
                ))}
              </div>
            ) : (
              <div className="p-3 bg-white rounded-lg shadow-sm border space-y-3">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="useGradient"
                    checked={useGradient}
                    onChange={(e) => setUseGradient(e.target.checked)}
                  />
                  <label htmlFor="useGradient" className="text-sm">Use Gradient</label>
                </div>
                
                {!useGradient ? (
                  <div>
                    <label className="block text-sm mb-1">Solid Color:</label>
                    <input 
                      type="color" 
                      value={selectedBackground}
                      onChange={(e) => setSelectedBackground(e.target.value)}
                      className="w-full h-8 cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm mb-1">Start Color:</label>
                      <input 
                        type="color" 
                        value={gradientStartColor}
                        onChange={(e) => setGradientStartColor(e.target.value)}
                        className="w-full h-8 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">End Color:</label>
                      <input 
                        type="color" 
                        value={gradientEndColor}
                        onChange={(e) => setGradientEndColor(e.target.value)}
                        className="w-full h-8 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Direction:</label>
                      <select
                        value={gradientDirection}
                        onChange={(e) => setGradientDirection(e.target.value)}
                        className="w-full p-1 border rounded"
                      >
                        {gradientDirections.map((dir) => (
                          <option key={dir.value} value={dir.value}>
                            {dir.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={addHeart}
              className="w-full bg-rose-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-rose-600"
            >
              ❤️ Add Heart
            </button>

            <button
              onClick={downloadCard}
              className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600"
            >
              💾 Save Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMaker;