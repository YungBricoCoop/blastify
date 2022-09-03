const Search = ({ display, value, onChange, onEnter }) => {
  return (
    <div className={`search-modal absolute w-full h-full left-0 top-0  p-2 rounded-xl bg-black/20 backdrop-blur-md ${display ? "" : "hidden"}`}>
      <div className="search-input-container shadow relative p-2 rounded-xl bg-white/20 w-96 mr-auto ml-auto mt-32 border-2 border-white/20">
        <input
          type={"text"}
          value={value}
          placeholder={"Search"}
          className="search-input w-full bg-transparent p-2 text-center outline-0 text-white font-medium"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return onEnter();
            }
          }}
        />
      </div>
    </div>
  );
};
export default Search;
