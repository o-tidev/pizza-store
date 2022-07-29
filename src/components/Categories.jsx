import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    "Kaikki",
    "Liha",
    "Kasvis",
    "Grilli",
    "Mausteinen",
    "Paistettu",
  ];

  function onCategoryClick(idx) {
    setActiveIndex(idx);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, idx) => (
          <li
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
