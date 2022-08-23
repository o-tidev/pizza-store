import React from "react";

type CategoriesProps = {
  categoryId: number;
  onCategorylClick: (idx: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  categoryId,
  onCategorylClick,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categories = ["All", "Meat", "Veggie", "Grill", "Spicy", "Baked"];

  function onCategoryClick(idx: number) {
    setActiveIndex(idx);
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((value, idx) => (
          <li
            key={idx}
            onClick={() => {
              onCategorylClick(idx);
            }}
            className={categoryId === idx ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
