import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    "All",
    "Meat",
    "Veggie",
    "Grill",
    "Spicy",
    "Baked",
  ];

  function onCategoryClick(idx) {
    setActiveIndex(idx);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, idx) => (
          <li key={idx}
            onClick={() => {
              onCategoryClick(idx);
            }}
            className={activeIndex === idx ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
