// logo
import logo from "../assets/img/logo.png";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsSearch,
  BsFillVolumeUpFill,
  BsApple,
} from "react-icons/bs";

const Toolbar = ({onLoginClick, onSearchClick, onPreviousTrack, onNextTrack, onHomeClick, onLibraryClick, onSettingsClick ,isDarkTheme}) => {

  const bgColor  = isDarkTheme ? "bg-black/20" : "bg-white/20";
  const textColor = isDarkTheme ? "text-white" : "text-black";
  const textClass = `mr-10 ${textColor} hover:opacity-60 hover:cursor-pointer`;

  return (
    <div className={`toolbar grid grid-cols-2 ${bgColor} bg-blend-color-burn backdrop-blur-sm pl-10 pr-10 pt-1 pb-1`}>
      <div className="flex align-middle items-center">
        <div className={textClass}>
          <BsApple onClick={onLoginClick}/>
        </div>
        <div className={textClass}>
          <h4 onClick={onHomeClick}>Home</h4>
        </div>
        <div className={textClass}>
          <h4 onClick={onLibraryClick}>Library</h4>
        </div>
        <div className={textClass}>
          <h4 onClick={onSettingsClick}>Settings</h4>
        </div>
      </div>
      <div className="flex justify-end	items-center">
        <div className={textClass}>
          <BsArrowLeftCircle onClick={onPreviousTrack}/>
        </div>
        <div className={textClass}>
          <BsArrowRightCircle onClick={onNextTrack}/>
        </div>
        <div className={textClass}>
          <BsSearch onClick={onSearchClick}/>
        </div>
        <div className={textClass}>
          <BsFillVolumeUpFill />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
