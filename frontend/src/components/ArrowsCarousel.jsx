import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ArrowsCarousel = ({
  onPrevious,
  onNext,
  displayPrevious = true,
  displayNext = true,
}) => {
  return (
    <div className="arrows-carousel h-full">
      <div className="absolute top-2/4 left-4">
        {displayPrevious && (
          <IoIosArrowBack
            size={"2vw"}
            color="white"
            className="hover:-translate-x-1 transition duration-500 hover:cursor-pointer"
            onClick={onPrevious}
          />
        )}
      </div>
      <div className="absolute top-2/4 right-4">
        {displayNext && (
          <IoIosArrowForward
            size={"2vw"}
            color="white"
            className="hover:translate-x-1 transition duration-500 hover:cursor-pointer"
            onClick={onNext}
          />
        )}
      </div>
    </div>
  );
};

export default ArrowsCarousel;
