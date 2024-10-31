import { FaMoon, FaRegSun } from "react-icons/fa6";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Colors, ThemeIcons, Themes, ThemeTypes } from "../utils/themes";
import BubbleSelector from "./BubbleSelector";
import { useCallback, useEffect } from "react";

const ThemeSelector: React.FC = () => {
  const [theme, setTheme] = useLocalStorage("theme", Themes.FLOPPA);
  const [themeType, setThemeType] = useLocalStorage(
    "themeType",
    ThemeTypes.DARK
  );

  // change theme variables on root
  const onChange = useCallback(
    (newTheme: Themes, newThemeType: ThemeTypes) => {
      if (theme !== newTheme) setTheme(newTheme);
      if (themeType !== newThemeType) setThemeType(newThemeType);

      const root = document.documentElement;
      const colors = Colors[newTheme][newThemeType];
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });

      // also change icon
      root.style.setProperty(`--icon`, `url(${ThemeIcons[newTheme]})`);
    },
    [setTheme, setThemeType, theme, themeType]
  );

  // on first load, set colors
  useEffect(() => {
    onChange(theme, themeType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        width: "100%",
      }}
    >
      <BubbleSelector
        value={theme}
        onChange={(value) => onChange(value as Themes, themeType)}
        options={Object.values(Themes).map((themeName) => ({
          id: themeName,
          image: (props) => <img {...props} src={ThemeIcons[themeName]} />,
        }))}
        imageSize={{ width: 50, height: 50 }}
      />

      <BubbleSelector
        value={themeType}
        onChange={(value) => onChange(theme, value as ThemeTypes)}
        options={Object.values(ThemeTypes).map((themeTypeName) => ({
          id: themeTypeName,
          image:
            themeTypeName === ThemeTypes.DARK
              ? (props) => <FaMoon size={20} {...props} />
              : (props) => <FaRegSun size={20} {...props} />,
        }))}
      />
    </div>
  );
};

export default ThemeSelector;