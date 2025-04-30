import React from "react";

interface Ingredient {
  id: number;
  original: string;
}

interface RecipeProps {
  recipe: {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    summary: string;
    instructions?: string;
    extendedIngredients?: Ingredient[];
    sourceUrl?: string;
  };
  mood: string;
}

const RecipeCard: React.FC<RecipeProps> = ({ recipe, mood }) => {
  const moodColors: Record<string, string> = {
    happy: "border-happy",
    sad: "border-sad",
    angry: "border-angry",
    relaxed: "border-relaxed",
    energetic: "border-energetic",
  };

  const borderColor = moodColors[mood] || "border-gray-200";

  // Strip HTML tags from summary and instructions
  const stripHtml = (html: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const cleanSummary = stripHtml(recipe.summary).slice(0, 300) + "...";
  const cleanInstructions = stripHtml(recipe.instructions || "");

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${borderColor} border-t-4`}>
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="recipe-image w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
          
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="mr-4">🕒 {recipe.readyInMinutes} minutes</span>
            <span>👥 {recipe.servings} servings</span>
          </div>
          
          <p className="text-gray-700 mb-6">{cleanSummary}</p>
          
          {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc pl-5">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="text-gray-700">
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {cleanInstructions && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Instructions</h3>
              <p className="text-gray-700">{cleanInstructions}</p>
            </div>
          )}
          
          {recipe.sourceUrl && (
            <a 
              href={recipe.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block mt-6 text-blue-600 hover:text-blue-800 hover:underline"
            >
              View original recipe
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
