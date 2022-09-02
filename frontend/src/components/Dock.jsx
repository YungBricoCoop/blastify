const Dock = ({data = []}) => {
  return (
    <div className="dock grid grid-cols-10 bg-white/[0.06] backdrop-blur-sm p-2 pl-4 pr-4 absolute bottom-10 left-1/4 right-1/4 rounded-2xl border-solid border-2 border-white/[0.05]">
      {
        data.map((item, index) => {
          return <div className="h-14 w-14 bg-white/[0.05] border-solid border-2 border-white/[0.05] rounded-xl opacity-90" style={{backgroundImage : `url("${item.image}")`, backgroundPosition : "center", backgroundSize : "cover"}}></div>
        })
      }
    </div>
  );
};

export default Dock;
