
import React from "react";
import { useNavigate } from "react-router-dom";
import MoodCard from "@/components/MoodCard";
import { Helmet } from "react-helmet";

const moods = [
  { id: "happy", name: "Happy", emoji: "😊", color: "bg-happy", hoverColor: "hover:bg-yellow-400" },
  { id: "sad", name: "Sad", emoji: "😔", color: "bg-sad", hoverColor: "hover:bg-blue-400" },
  { id: "angry", name: "Angry", emoji: "😡", color: "bg-angry", hoverColor: "hover:bg-red-500" },
  { id: "relaxed", name: "Relaxed", emoji: "😌", color: "bg-relaxed", hoverColor: "hover:bg-green-400" },
  { id: "energetic", name: "Energetic", emoji: "⚡", color: "bg-energetic", hoverColor: "hover:bg-orange-500" },
];

const Index = () => {
  const navigate = useNavigate();

  const handleMoodSelect = (moodId: string) => {
    navigate(`/recipes?mood=${moodId}`);
  };

  return (
    <>
      <Helmet>
        <title>Mood Food - Find Recipes Based on Your Mood</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-4xl w-full text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How are you feeling today?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your current mood and we'll find the perfect recipe to match how you're feeling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
          {moods.map((mood) => (
            <MoodCard
              key={mood.id}
              id={mood.id}
              name={mood.name}
              emoji={mood.emoji}
              color={mood.color}
              hoverColor={mood.hoverColor}
              onClick={() => handleMoodSelect(mood.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
