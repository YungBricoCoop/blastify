// components
import { BsCircle, BsXCircle } from "react-icons/bs";

const Search = ({
  display,
  value,
  onChange,
  onEnter,
  onClose,
  isDarkTheme,
}) => {

  const bgColor = isDarkTheme ? "bg-black/20" : "bg-white/20";
  const boColor = isDarkTheme ? "border-white/20" : "border-white/20";
  const textColor = isDarkTheme ? "text-white" : "text-black";

  return (
    <div
      className={`search-modal absolute w-full h-full left-0 top-0  p-2 rounded-xl backdrop-blur-md ${
        display ? "" : "hidden"
      } z-10`}
    >
      <div className={`search-input-container w-96 mr-auto ml-auto mt-32 ${textColor}`}>
        <div className={`shadow relative rounded-xl ${bgColor} border-2 ${boColor}`}>
          <div className={`flex gap-1 mb-2 p-2 rounded-t-lg ${bgColor} border-b-2 ${boColor}`}>
            <BsXCircle
              size={"18px"}
              className="cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 transition ease-in-out duration-300"
              onClick={onClose}
            />
            <BsCircle size={"18px"} className="opacity-50" />
            <BsCircle size={"18px"} className="opacity-50" />
          </div>
          <div className=" p-2 ">
            <input
              autoFocus
              type={"text"}
              value={value}
              placeholder={"Search"}
              className="search-input w-full bg-transparent p-2 text-center outline-0 font-medium"
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  return onEnter();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
