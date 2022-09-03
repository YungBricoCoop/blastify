// components
import ItemGrid from "../components/ItemGrid";

const ItemsGrid = ({ data = [], onItemGridClick}) => {
  return (
    <div className="grid grid-cols-4 gap-x-48 gap-y-24 place-content-stretch w-3/5 mr-auto ml-auto mt-10">
      {data.map((item, index) => {
        return <ItemGrid key={index} {...item} onItemGridClick/>;
      })}
    </div>
  );
};

export default ItemsGrid;
