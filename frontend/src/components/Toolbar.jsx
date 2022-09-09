// logo
import logo from "../assets/img/logo.png";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsSearch,
  BsFillVolumeUpFill,
  BsApple,
} from "react-icons/bs";

const Toolbar = ({onLoginClick, onSearchClick, onPreviousTrack, onNextTrack, onHomeClick, onLibraryClick, onSettingsClick}) => {
  return (
    <div className="toolbar grid grid-cols-2 bg-white/[0.05] backdrop-blur-sm pl-10 pr-10 pt-1 pb-1">
      <div className="flex align-middle items-center">
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <BsApple onClick={onLoginClick}/>
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <h4 onClick={onHomeClick}>Home</h4>
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <h4 onClick={onLibraryClick}>Library</h4>
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <h4 onClick={onSettingsClick}>Settings</h4>
        </div>
      </div>
      <div className="flex justify-end	items-center">
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <BsArrowLeftCircle onClick={onPreviousTrack}/>
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <BsArrowRightCircle onClick={onNextTrack}/>
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <BsSearch onClick={onSearchClick}/>
        </div>
        <div className="mr-10 text-white hover:text-white/60 hover:cursor-pointer">
          <BsFillVolumeUpFill />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
