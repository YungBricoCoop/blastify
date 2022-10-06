// components
import DockItem from "../components/DockItem";

const Dock = ({ data = [], onDockItemClick = () => {}, isDarkTheme }) => {

  const bgColor = isDarkTheme ? "bg-black/20" : "bg-white/20";
  const boColor = isDarkTheme ? "border-white/5" : "border-white/20";

  return (
    <div className={`dock grid grid-cols-10 ${bgColor} ${boColor} backdrop-blur-sm p-2 pl-4 pr-4 absolute bottom-10 left-1/4 right-1/4 rounded-2xl border-solid border-2`}>
      {data.map((item, index) => {
        return (
          <DockItem key={index} {...item} onDockItemClick={onDockItemClick} />
        );
      })}
    </div>
  );
};

export default Dock;
