// components
import ItemGrid from "../components/ItemGrid";
import ArrowsCarousel from "./ArrowsCarousel";

const ItemsGrid = ({
  data = [],
  offset = 0,
  onItemGridClick = () => {},
  onNext,
  onPrevious,
  isDarkTheme,
}) => {
  const maxItems = 12;
  const maxOffset = Math.ceil(data.length / maxItems) - 1;
  const minRange = offset * maxItems;
  const maxRange = (offset + 1) * maxItems;
  const textColor = isDarkTheme ? "text-white" : "text-black";
  return (
    <div className="items-grid">
      <ArrowsCarousel
        onNext={onNext}
        onPrevious={onPrevious}
        displayNext={offset < maxOffset}
        displayPrevious={offset > 0}
        color={isDarkTheme ? "white" : "black"}
      />
      <div
        className={`grid grid-cols-4 gap-x-48 gap-y-24 place-content-stretch w-3/5 mr-auto ml-auto mt-10 ${textColor}`}
      >
        {data.map((item, index) => {
            return (
              <ItemGrid
                key={index}
                {...item}
                hidden = {index < minRange || index >= maxRange}
                onItemGridClick={onItemGridClick}
              />
            );
        })}
      </div>
    </div>
  );
};

export default ItemsGrid;
