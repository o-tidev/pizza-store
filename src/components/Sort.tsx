import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterSelector, setSort } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sortKey: string;
};

export const list: SortItem[] = [
  {
    name: "popularity (asc)",
    sortKey: "rating",
  },
  {
    name: "popularity (desc)",
    sortKey: "-rating",
  },
  {
    name: "price (asc)",
    sortKey: "price",
  },
  {
    name: "price (desc)",
    sortKey: "-price",
  },
  {
    name: "aplhabetical (asc)",
    sortKey: "title",
  },
  {
    name: "aplhabetical (desc)",
    sortKey: "-title",
  },
];

type PopupClickType = MouseEvent & {
  path: Node[];
};

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector(filterSelector);
  const sortReference = React.useRef<HTMLDivElement>(null);

  const [isOpened, setIsOpened] = React.useState(false);

  let setActive = (object: SortItem) => {
    dispatch(setSort(object));
    setIsOpened(!isOpened);
  };

  React.useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      // is there a better way to check if it is a valid value?
      const event = e as PopupClickType;
      if (sortReference.current && !event.path.includes(sortReference.current)) {
        setIsOpened(false);
        console.log("clickie");
      }
    };
    document.body.addEventListener("click", outsideClickHandler);

    return () => {
      document.body.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  return (
    <div ref={sortReference} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setIsOpened(!isOpened)}>{sort.name}</span>
      </div>
      {isOpened && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, idx) => (
              <li
                key={idx}
                className={sort.sortKey === obj.sortKey ? "active" : ""}
                onClick={() => setActive(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
