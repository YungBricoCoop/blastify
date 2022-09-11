// components

const MultiDisplayGridItem = ({
  id,
  image,
  name,
  type,
  onItemGridClick = () => {},
}) => {
  return (
    <div
      className="relative text-center opacity-95 hover:opacity-100 hover:scale-110 transition ease-in-out delay-20 duration-200 hover:cursor-pointer"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      onClick={() => onItemGridClick({ id, name, image, type })}
    >
      <img src={image} className="aspect-square rounded-xl"></img>
        <h5 className="text-sm">{name}</h5>
    </div>
  );
};

export default MultiDisplayGridItem;
