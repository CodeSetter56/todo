import { useTheme } from "../../context/ThemeContext";
import { IoMoonOutline, IoSunnySharp } from "react-icons/io5";

function ThemeSlider() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" onChange={toggleTheme} checked={isDark} />
      <IoMoonOutline className="swap-on fill-current w-6 h-6"/>
      <IoSunnySharp className="swap-off fill-current w-6 h-6" />
    </label>
  );
}

export default ThemeSlider;
