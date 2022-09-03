const DockItem = ({ image, name, id, onDockItemClick = () => {} }) => {
  return (
    <div
      onClick={() => onDockItemClick({ image, name, id })}
      className="h-14 w-14 bg-white/[0.05] border-solid border-2 border-white/[0.05] rounded-xl opacity-90"
      style={{
        backgroundImage: `url("${image}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    ></div>
  );
};

export default DockItem;
