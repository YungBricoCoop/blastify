// components
import DockItem from "../components/DockItem";

const Dock = ({ data = [], onDockItemClick = () => {} }) => {
  return (
    <div className="dock grid grid-cols-10 bg-white/[0.06] backdrop-blur-sm p-2 pl-4 pr-4 absolute bottom-10 left-1/4 right-1/4 rounded-2xl border-solid border-2 border-white/[0.05]">
      {data.map((item, index) => {
        return (
          <DockItem key={index} {...item} onDockItemClick={onDockItemClick} />
        );
      })}
    </div>
  );
};

export default Dock;
