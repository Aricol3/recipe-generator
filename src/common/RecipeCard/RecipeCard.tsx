import "./RecipeCard.scss";
import { useState } from "react";
import HeartButton from "../HeartButton/HeartButton";
import placeholderIMG from "../../assets/placeholder-image.jpg"

const RecipeCard = () => {
  const [active, setActive] = useState(false)

  return (
    <div className="card">
      <div className="image-container">
        <img className="card-image" src={placeholderIMG} alt="recipe image"/>
      </div>
      <div className="card-content">
        <h2>Mashed potatoes</h2>
        <p>20 min.</p>
      </div>
      <div className="heart-container">
        <HeartButton isActive={active} onClick={() => setActive(!active)}/>
      </div>
    </div>
  );
};

export default RecipeCard;
