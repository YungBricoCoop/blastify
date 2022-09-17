// components
import {
  BsCircle,
  BsXCircle,
  BsMoonFill,
  BsMoon,
  BsSunFill,
  BsSun,
  BsFillPersonXFill,
} from "react-icons/bs";

const Settings = ({
  display,
  onClose,
  isDarkTheme = true,
  onChangeTheme,
  onLogout,
}) => {

    const bgColor  = isDarkTheme ? "bg-black/20" : "bg-white/20";
    const boColor  = isDarkTheme ? "border-white/20" : "border-white/20";
    const textColor = isDarkTheme ? "text-white" : "text-black";

  return (
    <div
      className={`settings-modal absolute w-full h-full left-0 top-0  p-2 rounded-xl backdrop-blur-md ${
        display ? "" : "hidden"
      } z-10`}
    >
      <div className={`settings-input-container w-2/4 mr-auto ml-auto mt-32 ${textColor}`}>
        <div className={`shadow relative  rounded-xl ${bgColor} border-2 ${boColor}`}>
          <div className={`flex gap-1 mb-2 p-2 rounded-t-lg ${bgColor} border-b-2 ${boColor}`} >
            <BsXCircle
              size={"18px"}
              className="cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 transition ease-in-out duration-300"
              onClick={onClose}
            />
            <BsCircle size={"18px"} className="opacity-50" />
            <BsCircle size={"18px"} className="opacity-50" />
          </div>
          <div className="flex gap-2 p-4">
            <div className="flex-1">
              <div className="flex gap-2 mt-2">
                <div className="flex-1 gap-2">
                  <div>
                    <h1 className="text-lg font-bold">Theme</h1>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-sm">Set default Blastify color theme</p>
                    <BsMoonFill
                      size={"18px"}
                      className={`opacity-80  ${isDarkTheme ? "" : "hidden"}`}
                    />
                    <BsMoon
                      size={"18px"}
                      className={`opacity-50 hover:scale-125 hover:cursor-pointer hover:opacity-80 transition-all ${
                        isDarkTheme ? "hidden" : ""
                      }`}
                      onClick={() => onChangeTheme(true)}
                    />
                    <BsSunFill
                      size={"18px"}
                      className={`opacity-80 ${isDarkTheme ? "hidden" : ""}`}
                    />
                    <BsSun
                      size={"18px"}
                      className={`opacity-50 hover:scale-125 hover:cursor-pointer hover:opacity-80 transition-all ${
                        isDarkTheme ? "" : "hidden"
                      }`}
                      onClick={() => onChangeTheme(false)}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div>
                    <h1 className="text-lg font-bold">Account</h1>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-sm">Disconnect from Blastify</p>
                    <BsFillPersonXFill
                      size={"18px"}
                      className={`opacity-50  hover:scale-125 hover:cursor-pointer hover:opacity-80 transition-all`}
                      onClick={onLogout}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div>
                    <h1 className="text-lg font-bold">Spotify</h1>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-sm">Display items duration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
