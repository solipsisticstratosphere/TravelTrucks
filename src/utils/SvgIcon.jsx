import biGrid1x2 from "../assets/icons/bi_grid-1x2.svg";
import biGrid3x3Gap from "../assets/icons/bi_grid-3x3-gap.svg";
import biGrid from "../assets/icons/bi_grid.svg";
import cupHot from "../assets/icons/cup-hot.svg";
import hugeiconsGasStove from "../assets/icons/hugeicons_gas-stove.svg";
import lucideMicrowave from "../assets/icons/lucide_microwave.svg";
import phShower from "../assets/icons/ph_shower.svg";
import solarFridgeOutline from "../assets/icons/solar_fridge-outline.svg";
import tv from "../assets/icons/tv.svg";
import wind from "../assets/icons/wind.svg";
import diagram from "../assets/icons/diagram.svg";
import map from "../assets/icons/Map.svg";
import heart from "../assets/icons/Heart.svg";
import fuelPump from "../assets/icons/fuel-pump.svg";
import radio from "../assets/icons/ui-radios.svg";
import water from "../assets/icons/ion_water-outline.svg";
import rating from "../assets/icons/Rating.svg";
import ratingGrey from "../assets/icons/rating_grey.svg";
const IconMap = {
  "bi-grid-1x2": biGrid1x2,
  "bi-grid-3x3-gap": biGrid3x3Gap,
  "bi-grid": biGrid,
  "cup-hot": cupHot,
  "hugicons-gas-stove": hugeiconsGasStove,
  "lucide-microwave": lucideMicrowave,
  "ph-shower": phShower,
  "solar-fridge-outline": solarFridgeOutline,
  tv: tv,
  wind: wind,
  diagram: diagram,
  map: map,
  heart: heart,
  "fuel-pump": fuelPump,
  radio: radio,
  water: water,
  rating: rating,
  ratingGrey: ratingGrey,
};

const SvgIcon = ({ name, className, color, focusColor, ...props }) => {
  const iconUrl = IconMap[name];

  if (!iconUrl) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const getColorFilter = (colorValue) => {
    return colorValue
      ? `invert(1) sepia(1) saturate(5) hue-rotate(${colorValue}deg)`
      : "";
  };

  return (
    <img
      src={iconUrl}
      className={className}
      alt={`${name} icon`}
      style={{
        filter: getColorFilter(color),
        transition: "filter 0.3s ease",
      }}
      {...props}
    />
  );
};

export default SvgIcon;
