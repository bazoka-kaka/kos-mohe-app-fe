import { useEffect } from "react";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const MultiCarousel = ({ children, total }) => {
  const [index, setIndex] = useState({
    begin: 0,
    end: 0,
  });

  useEffect(() => {
    setIndex({ begin: 0, end: total - 1 });
  }, []);

  const handleLeft = () => {
    if (index.begin - 1 >= 0) {
      setIndex((prev) => ({ begin: prev.begin - 1, end: prev.end - 1 }));
    }
  };

  const handleRight = () => {
    if (index.end + 1 < children.length) {
      setIndex((prev) => ({ begin: prev.begin + 1, end: prev.end + 1 }));
    }
  };

  return (
    <div className='relative flex gap-8 mt-6'>
      <button
        className='absolute -translate-x-full -translate-y-1/2 -left-2 top-1/2'
        onClick={handleLeft}
      >
        <FiChevronLeft />
      </button>
      {children.map((item, i) => {
        if (i >= index.begin && i <= index.end) {
          return item;
        }
      })}
      <button
        className='absolute translate-x-full -translate-y-1/2 -right-2 top-1/2'
        onClick={handleRight}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default MultiCarousel;
