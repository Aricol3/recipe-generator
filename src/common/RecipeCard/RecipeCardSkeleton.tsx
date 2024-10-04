import "./RecipeCardSkeleton.scss";

const RecipeCardSkeleton = () => {
  return (
    <div className="card skeleton">
      <div className="image-container skeleton-image"></div>
      <div className="card-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
      </div>
      <div className="heart-container">
        <div className="skeleton-heart"></div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;
