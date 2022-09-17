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

const Settings = ({ display, onClose, isDarkTheme = true, onChangeTheme, onLogout}) => {
  return (
    <div
      className={`search-modal absolute w-full h-full left-0 top-0  p-2 rounded-xl bg-black/5 backdrop-blur-md ${
        display ? "" : "hidden"
      } z-10`}
    >
      <div className="search-input-container w-2/4 mr-auto ml-auto mt-32 text-white">
        <div className="shadow relative  rounded-xl bg-white/5  border-2 border-white/50">
          <div className="flex gap-1 mb-2 p-2 border-b-2 border-white/50 bg-white/10">
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
                      color="black"
                    />
                    <BsMoon
                      size={"18px"}
                      className={`opacity-50 hover:scale-125 hover:cursor-pointer hover:opacity-80 transition-all ${
                        isDarkTheme ? "hidden" : ""
                      }`}
                      color="black"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
