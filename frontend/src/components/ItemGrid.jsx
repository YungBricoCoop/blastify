const ItemGrid = ({ id, image, name, type, hidden, onItemGridClick = () => {} }) => {
  return (
    <div
      className={`${hidden ? "hidden" : ""} relative item-grid aspect-square flex shadow-xl rounded-3xl text-center hover:mix-blend-color-dodge hover:border-1 border-white/20 hover:opacity-100 hover:scale-110 hover:rotate-3 inset transition ease-in-out delay-20 duration-200 hover:cursor-pointer`}
      style={{
        backgroundImage: `url("${image}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      onClick={() => onItemGridClick({ id, name, image, type })}
    >
      <h1 className="absolute text-white -bottom-8">{name}</h1>
    </div>
  );
};

export default ItemGrid;
