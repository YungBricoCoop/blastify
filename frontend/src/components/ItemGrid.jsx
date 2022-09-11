const ItemGrid = ({ id, image, name, type, hidden, onItemGridClick = () => {} }) => {
  return (
    <div
      className={`${hidden ? "hidden" : ""} relative  hover:mix-blend-color-dodge hover:border-1 border-white/20 hover:opacity-100 hover:scale-110 hover:rotate-3 inset transition ease-in-out delay-20 duration-200 hover:cursor-pointer`}
      onClick={() => onItemGridClick({ id, name, image, type })}
    >
      <img src={image} className="aspect-square rounded-2xl"></img>
      <h1 className="absolute text-white -bottom-8 w-full break-words pl-2 pr-2">{name}</h1>
    </div>
  );
};

export default ItemGrid;
