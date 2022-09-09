// components
import { BsCircle, BsXCircle } from "react-icons/bs";

const Search = ({ display, value, onChange, onEnter, onClose }) => {
  return (
    <div
      className={`search-modal absolute w-full h-full left-0 top-0  p-2 rounded-xl bg-black/5 backdrop-blur-md ${
        display ? "" : "hidden"
      } z-10`}
    >
      <div className="search-input-container w-96 mr-auto ml-auto mt-32 text-white">
        <div className="flex gap-1 mb-2">
          <BsXCircle
            size={"18px"}
            className="cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 transition ease-in-out duration-300"
            onClick={onClose}
          />
          <BsCircle size={"18px"} className="opacity-50" />
          <BsCircle size={"18px"} className="opacity-50" />
        </div>

        <div className="shadow relative p-2 rounded-xl bg-white/5  border-2 border-white/50">
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
  );
};
export default Search;
