import {
    BsArrowLeftSquare,
    BsArrowRightSquare,
  } from "react-icons/bs";

const ArrowsCarousel = ({onPrevious, onNext}) => {
  return (
    <div className="arrows-carousel h-full">
      <div className="absolute top-2/4 left-4">
        <BsArrowLeftSquare size={"2vw"} color="white" className="hover:-translate-x-1" onClick={onPrevious}/>
      </div>
      <div className="absolute top-2/4 right-4">
        <BsArrowRightSquare size={"2vw"} color="white" className="hover:translate-x-1" onClick={onNext}/>
      </div>
    </div>
  );
};

export default ArrowsCarousel;