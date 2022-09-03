const DockItem = ({ image, name, id, onDockItemClick = () => {} }) => {
  return (
    <div
      onClick={() => onDockItemClick({ image, name, id })}
      className="h-14 w-14 bg-white/[0.05] rounded-xl opacity-90 hover:-translate-y-10 hover:scale-150 hover:opacity-100 hover:rotate-6 hover:cursor-pointer transition ease-in-out delay-20 duration-300"
      style={{
        backgroundImage: `url("${image}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    ></div>
  );
};

export default DockItem;
