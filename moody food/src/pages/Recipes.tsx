import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Keep mock data for fallback
import { mockRecipeData, mockAlternativeRecipeData } from "@/lib/mockData";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string;
  extendedIngredients: {
    id: number;
    original: string;
  }[];
  sourceUrl?: string;
}

// This would normally be done in getServerSideProps in Next.js
const moodToSearch: Record<string, string> = {
  happy: "colorful creative",
  sad: "comfort soup",
  angry: "spicy",
  relaxed: "light salad",
  energetic: "protein energy",
};

const Recipes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger re-fetching
  const [useApiDisabled, setUseApiDisabled] = useState(false); // Track if API is unavailable
  const [alternativeIndex, setAlternativeIndex] = useState(0); // Index for mock alternatives

  const moodParam = new URLSearchParams(location.search).get("mood");
  const mood = moodParam || "happy";
  const searchTerm = moodToSearch[mood] || "comfort food";

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      
      // If API is disabled, use mock data directly
      if (useApiDisabled) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        const mockData = alternativeIndex === 0 ? mockRecipeData : mockAlternativeRecipeData;
        const mockRecipe = mockData[mood];
        if (mockRecipe) {
          setRecipe(mockRecipe);
        } else {
          setError("No recipe found for this mood");
          toast.error("Couldn't find a recipe for your mood. Please try again.");
        }
        setLoading(false);
        return;
      }
      
      try {
        // The API key would normally be in an environment variable
        const API_KEY = "3fff7681cc754043bb7af0562c964dc6";
        const randomOffset = Math.floor(Math.random() * 100); // Randomize results
        
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(searchTerm)}&addRecipeInformation=true&number=1&offset=${randomOffset}&apiKey=${API_KEY}`
        );
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          setRecipe(data.results[0]);
          console.log("Recipe fetched:", data.results[0]);
        } else {
          console.log("No recipes found in response:", data);
          
          // Check if API limit is reached
          if (data.status === "failure" && data.code === 402) {
            toast.error("API daily limit reached. Using our sample recipes instead.");
            setUseApiDisabled(true); // Disable API for future requests
            
            // Use mock data as fallback
            const mockData = alternativeIndex === 0 ? mockRecipeData : mockAlternativeRecipeData;
            const mockRecipe = mockData[mood];
            if (mockRecipe) {
              setRecipe(mockRecipe);
            } else {
              throw new Error("No recipe found for this mood");
            }
          } else {
            // Fallback to mock data if API returns no results for other reasons
            const mockData = alternativeIndex === 0 ? mockRecipeData : mockAlternativeRecipeData;
            const mockRecipe = mockData[mood];
            if (mockRecipe) {
              setRecipe(mockRecipe);
              toast.warning("Using sample recipe - couldn't find more recipes for this mood.");
            } else {
              throw new Error("No recipe found for this mood");
            }
          }
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe. Please try another mood.");
        toast.error("Couldn't find a recipe for your mood. Please try again.");
        
        // Fallback to mock data on error
        const mockData = alternativeIndex === 0 ? mockRecipeData : mockAlternativeRecipeData;
        const mockRecipe = mockData[mood];
        if (mockRecipe) {
          setRecipe(mockRecipe);
          setError(null);
          toast.info("Showing you a sample recipe instead.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [mood, searchTerm, refreshKey, useApiDisabled, alternativeIndex]);

  const getEmoji = () => {
    const emojis: Record<string, string> = {
      happy: "😊",
      sad: "😔",
      angry: "😡",
      relaxed: "😌",
      energetic: "⚡",
    };
    return emojis[mood] || "🍽️";
  };

  const getMoodTitle = () => {
    return mood.charAt(0).toUpperCase() + mood.slice(1);
  };

  const handleAlternativeRecipe = () => {
    if (useApiDisabled) {
      // Toggle between main and alternative mock data
      setAlternativeIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    } else {
      // Try a different recipe from the API
      setRefreshKey(prev => prev + 1);
    }
    
    toast.info("Finding you an alternative recipe...");
  };

  return (
    <>
      <Helmet>
        <title>{`${getMoodTitle()} Mood Recipe - Mood Food`}</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate("/")}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to moods
          </button>
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <span>{getEmoji()}</span>
              <span>Recipe for {getMoodTitle()} Mood</span>
            </h1>
            <p className="text-gray-600 mt-3">
              Here's the perfect recipe that matches how you're feeling right now
              {useApiDisabled && <span className="block text-amber-600 text-sm mt-1">(Using sample recipes - API limit reached)</span>}
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin mr-2 h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="ml-3 text-gray-500">Finding the perfect recipe...</span>
            </div>
          )}

          {error && !loading && !recipe && (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={() => navigate("/")}
                className="mt-4 px-5 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Try a different mood
              </button>
            </div>
          )}

          {recipe && !loading && (
            <>
              <RecipeCard recipe={recipe} mood={mood} />
              
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleAlternativeRecipe}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Show me a different recipe
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Recipes;
