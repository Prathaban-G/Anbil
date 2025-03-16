import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, HeartPulse } from "lucide-react";

const flamesResults = [
  "Friends ❤️", "Love 💕", "Affection 🥰", "Marriage 💍", "Enemies 😡", "Soulmates 💖"
];

function calculateFLAMES(name1, name2) {
  const combined = (name1 + name2).replace(/\s+/g, "").toLowerCase();
  const uniqueCount = new Set(combined).size;
  return flamesResults[uniqueCount % flamesResults.length];
}

export default function LoveFlames() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (name1 && name2) {
      setResult(calculateFLAMES(name1, name2));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center   p-6">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 text-center max-w-sm w-full border-4 border-pink-400"
      >
        <h2 className="text-3xl font-bold text-pink-600 flex items-center justify-center gap-2">
          <Heart className="text-red-500" /> Love Flames <Heart className="text-red-500" />
        </h2>
        <input
          type="text"
          placeholder="Your Name"
          className="mt-4 p-2 w-full border rounded-lg text-center"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Partner's Name"
          className="mt-2 p-2 w-full border rounded-lg text-center"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
        />
        <motion.button
          onClick={handleCalculate}
          className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
          whileHover={{ scale: 1.1 }}
        >
          Calculate <Sparkles className="inline-block ml-1" />
        </motion.button>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-xl font-bold text-red-600 flex items-center justify-center gap-2"
          >
            <HeartPulse className="text-red-500 animate-pulse" /> {result}
          </motion.div>
        )}
        <LovePercentage name1={name1} name2={name2} />
      </motion.div>
    </div>
  );
}

export function LovePercentage({ name1, name2 }) {
  if (!name1 || !name2) return null;

  function calculateLovePercentage(name1, name2) {
    let sum = 0;
    for (let char of (name1 + name2).toLowerCase()) {
      sum += char.charCodeAt(0);
    }
    return (sum % 101) + "%";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-2 text-lg font-semibold text-pink-700"
    >
      Love Percentage: {calculateLovePercentage(name1, name2)}
    </motion.div>
  );
}
