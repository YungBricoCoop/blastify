// logo
import logo from "../assets/img/logo.png";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsSearch,
  BsVolumeDown,
} from "react-icons/bs";

const Toolbar = () => {
  return (
    <div class="toolbar grid grid-cols-2 bg-white/[0.05] backdrop-blur-sm pl-10 pr-10 pt-1 pb-1">
      <div>
        <ul className="flex">
          <li className="mr-6 text-white">
            <img src={logo} alt="logo" style={{ height: "20px" }} />
          </li>
          <li className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
            <h4>Home</h4>
          </li>
          <li className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
            <h4>Library</h4>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex justify-end	">
          <li className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
            <BsArrowLeftCircle />
          </li>
          <li className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
            <BsArrowRightCircle />
          </li>
          <li className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
            <BsSearch />
          </li>
          <li className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
            <BsVolumeDown />
          </li>
          <li className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
            <h4>Settings</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Toolbar;
