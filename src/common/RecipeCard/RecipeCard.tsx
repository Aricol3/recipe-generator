import "./RecipeCard.scss";
import { useState } from "react";
import HeartButton from "../HeartButton/HeartButton";
import placeholderIMG from "../../assets/placeholder-image.jpg";

const RecipeCard = ({ title, time, ingredients, instructions }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="card">
      <div className="image-container">
        <img className="card-image" src={placeholderIMG} alt="recipe image" />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{time}</p>
      </div>
      <div className="heart-container">
        <HeartButton isActive={active} onClick={() => setActive(!active)} />
      </div>
    </div>
  );
};

export default RecipeCard;
