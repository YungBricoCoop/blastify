// logo
import logo from "../assets/img/logo.png";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsSearch,
  BsVolumeDown,
  BsApple,
} from "react-icons/bs";

const Toolbar = ({onLoginClick}) => {
  return (
    <div class="toolbar grid grid-cols-2 bg-white/[0.05] backdrop-blur-sm pl-10 pr-10 pt-1 pb-1">
      <div className="flex align-middle items-center">
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <BsApple onClick={onLoginClick}/>
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <h4>Home</h4>
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <h4>library</h4>
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <h4>Settings</h4>
        </div>
      </div>
      <div className="flex justify-end	items-center">
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <BsArrowLeftCircle />
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <BsArrowRightCircle />
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <BsSearch />
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <BsVolumeDown />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
