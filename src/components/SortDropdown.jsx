import { useState, useRef, useEffect } from "react";

export default function SortDropdown() {
  const [openSort, setOpenSort] = useState(false);
  const [sortType, setSortType] = useState("Sort by");
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenSort(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpenSort(!openSort)}
        className="flex items-center justify-between w-40 py-2 mt-2 text-sm font-semibold text-left bg-gray-800 text-white rounded-lg border border-gray-600 px-4"
      >
        <span>{sortType}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className={`w-4 h-4 transition-transform duration-200 transform ${
            openSort ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {openSort && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900 text-white rounded-md shadow-lg border border-gray-700">
          <div className="px-2 pt-2 pb-2">
            <div className="flex flex-col">
              {["Most discussed", "Most popular", "Most upvoted"].map(
                (option) =>
                  option !== sortType && (
                    <button
                      key={option}
                      onClick={() => {
                        setSortType(option);
                        setOpenSort(false);
                      }}
                      className="flex flex-row items-start rounded-lg p-2 hover:bg-gray-700"
                    >
                      <p className="font-semibold">{option}</p>
                    </button>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
