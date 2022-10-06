const ItemGrid = ({
  id,
  image,
  name,
  type,
  colorMix,
  hidden,
  onItemGridClick = () => {},
}) => {
  return (
    <div
      className={`${hidden ? "hidden" : ""} relative`}
      onClick={() => onItemGridClick({ id, name, image, type })}
    >
      <img
        src={image}
        className={`aspect-square rounded-2xl border-white/20 hover:scale-90 hover:rotate-2 hover:opacity-80 inset transition ease-in-out delay-20 duration-200 hover:cursor-pointer `}
      ></img>
      <img
        src={image}
        className={`absolute top-0 aspect-square rounded-2xl -z-10 blur-sm p-1 opacity-50`}
      ></img>
      <h1 className="absolute -bottom-8 w-full break-words pl-2 pr-2">
        {name}
      </h1>
    </div>
  );
};

export default ItemGrid;
