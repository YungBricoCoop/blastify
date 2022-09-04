// components
import ItemGrid from "../components/ItemGrid";

const ItemsGrid = ({ data = [], offset = 0, onItemGridClick = () => {} }) => {
  const maxItems = 12;
  return (
    <div className="grid grid-cols-4 gap-x-48 gap-y-24 place-content-stretch w-3/5 mr-auto ml-auto mt-10">
      {data.map((item, index) => {
        if (index >= offset * maxItems && index < (offset + 1) * maxItems) {
          return (
            <ItemGrid key={index} {...item} onItemGridClick={onItemGridClick} />
          );
        }
      })}
    </div>
  );
};

export default ItemsGrid;
