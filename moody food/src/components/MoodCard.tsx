
import React from "react";

interface MoodCardProps {
  id: string;
  name: string;
  emoji: string;
  color: string;
  hoverColor: string;
  onClick: () => void;
}

const MoodCard: React.FC<MoodCardProps> = ({ 
  id, 
  name, 
  emoji, 
  color, 
  hoverColor, 
  onClick 
}) => {
  return (
    <div 
      className={`mood-card ${color} ${hoverColor} bg-opacity-20 hover:bg-opacity-30`}
      onClick={onClick}
      data-testid={`mood-${id}`}
    >
      <div className="mood-card-emoji" role="img" aria-label={name}>
        {emoji}
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
    </div>
  );
};

export default MoodCard;
