import Star from "../icons/Star";

function StarRating({rating}) {

  const maxRating = 5;

  return (
    <div className="flex items-center my-2">
    
      {[...Array(maxRating)].map((_, index) => {
        
          const starValue = index + 1;
          const fill = starValue <= rating ? "#f8d617" : "none";

          return <Star key={index} fill={fill} />
          
        })}

        <p className="text-third">({rating})</p>

    </div>
  )
}

export default StarRating
