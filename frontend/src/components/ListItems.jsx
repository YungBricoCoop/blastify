// components
import ListItem from "./ListItem";
import { BsXCircle, BsCircle } from "react-icons/bs";

const ListItems = ({
  data = {},
  type = "list",
  list = [],
  grid = [],
  onListItemClick = () => {},
  onClose = () => {},
}) => {
  return (
    <div className="list-items text-left w-2/4  ml-auto mr-auto mt-48 rounded-xl p-12 border-4 border-white/10 text-white shadow-md backdrop-blur-md">
      <div className="absolute flex gap-x-2 left-2 top-2">
        <BsXCircle
          size={"18px"}
          className="cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 transition ease-in-out duration-300"
          onClick={onClose}
        />
        <BsCircle
          size={"18px"}
          className="opacity-50"
        />
        <BsCircle
          size={"18px"}
          className="opacity-50"
        />
      </div>
      <div className="flex items-center justify-between	">
        <div>
          <h1 className="text-center font-medium">{data?.album}</h1>
          <div className=" bg-white/10 rounded-2xl">
            <img src={data.image} className="w-60 rounded-xl aspect-square" />
          </div>
          <h1 className="text-center font-medium">{data?.name}</h1>
        </div>
        {type === "list" && (
          <div className="overflow-x-auto overflow-y-scroll relative sm:rounded-lg">
            <table className="table-auto">
              <thead className="border-b-2 border-white/10">
                <tr className="">
                  <th className="p-1">Title</th>
                  <th className="p-1">Duration</th>
                </tr>
              </thead>
              <tbody>
                {list?.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      {...item}
                      onListItemClick={onListItemClick}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {type === "grid" && <div></div>}
      </div>
    </div>
  );
};

export default ListItems;
