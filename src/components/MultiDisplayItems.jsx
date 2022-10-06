// components
import MultiDisplayItem from "./MultiDisplayItem";
import MultiDisplayGridItem from "./MultiDisplayGridItem";
import { BsXCircle, BsCircle } from "react-icons/bs";
import ArrowCarousel from "./ArrowsCarousel";
const MultiDisplayItems = ({
  data = {},
  display = "list",
  list = [],
  grid = [],
  offset = 0,
  isDarkTheme,
  onItemClick = () => {},
  onClose = () => {},
  onNext = () => {},
  onPrevious = () => {},
}) => {

  const displayArrows = list.length > 0 && grid.length > 0;

  const bgColor = isDarkTheme ? "bg-black/10" : "bg-white/20";
  const boColor = isDarkTheme ? "border-white/10" : "border-white/20";
  const textColor = isDarkTheme ? "text-white" : "text-black";

  return (
    <div className={`relative list-items text-left w-2/4  ml-auto mr-auto mt-48 rounded-xl p-12 border-2 ${bgColor} ${boColor} ${textColor} shadow-md backdrop-blur-md`}>
      <ArrowCarousel
        onNext={onNext}
        onPrevious={onPrevious}
        displayNext={displayArrows && offset === 0}
        displayPrevious={displayArrows && offset === 1}
        color={isDarkTheme ? "white" : "black"}
      />
      <div className="absolute flex gap-x-2 left-2 top-2">
        <BsXCircle
          size={"18px"}
          className="cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 transition ease-in-out duration-300"
          onClick={onClose}
        />
        <BsCircle size={"18px"} className="opacity-50" />
        <BsCircle size={"18px"} className="opacity-50" />
      </div>
      <div className="flex items-center gap-x-24 justify-evenly">
        <div className="flex-initial">
          <h1 className="text-center font-medium">{data?.album}</h1>
          <img src={data.image} className="w-60 rounded-xl aspect-square" />
          <h1 className="text-center font-medium">{data?.name}</h1>
        </div>

        <div
          className={`${
            display === "list" ? "" : "hidden"
          } flex-initial overflow-x-auto overflow-y-scroll relative sm:rounded-lg w-2/4 h-80`}
        >
          <table className="table-auto w-full">
            <thead className="border-b-2 border-white/10">
              <tr className="">
                <th className="p-1">Title</th>
                <th className="p-1 pr-10 text-right">Duration</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item, index) => {
                return (
                  <MultiDisplayItem
                    key={index}
                    {...item}
                    onListItemClick={onItemClick}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className={`${
            display === "grid" ? "grid" : "hidden"
          } grid-cols-3 gap-x-4 gap-y-4 overflow-x-auto overflow-y-scroll  w-2/4 h-80 p-8`}
        >
          {grid?.map((item, index) => {
            return (
              <MultiDisplayGridItem
                key={index}
                {...item}
                onItemGridClick={onItemClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MultiDisplayItems;
