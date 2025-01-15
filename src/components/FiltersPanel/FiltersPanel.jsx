import { useState } from "react";
import styles from "./FiltersPanel.module.css";
import {
  Search,
  Wind,
  Cog,
  Coffee,
  Tv,
  Bath,
  Car,
  LayoutGrid,
  Grid3X3,
} from "lucide-react";

const FiltersPanel = ({ filters, onFilterChange, disabled }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleLocalFilterChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    onFilterChange(localFilters);
  };

  return (
    <div className={styles.filtersCard}>
      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Location</h3>
        <div className={styles.locationInputWrapper}>
          <input
            type="text"
            value={localFilters.location}
            onChange={(e) =>
              handleLocalFilterChange("location", e.target.value)
            }
            placeholder="Kyiv, Ukraine"
            className={styles.locationInput}
            disabled={disabled}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Filters</h3>

        <h4 className={styles.subsectionTitle}>Vehicle equipment</h4>
        <div className={styles.equipmentGrid}>
          <button
            className={`${styles.equipmentButton} ${
              localFilters.AC ? styles.active : ""
            }`}
            onClick={() => handleLocalFilterChange("AC", !localFilters.AC)}
            type="button"
          >
            <Wind className={styles.icon} />
            <span>AC</span>
          </button>

          <button
            className={`${styles.equipmentButton} ${
              localFilters.transmission === "automatic" ? styles.active : ""
            }`}
            onClick={() =>
              handleLocalFilterChange(
                "transmission",
                localFilters.transmission === "automatic" ? "" : "automatic"
              )
            }
            type="button"
          >
            <Cog className={styles.icon} />
            <span>Automatic</span>
          </button>

          <button
            className={`${styles.equipmentButton} ${
              localFilters.kitchen ? styles.active : ""
            }`}
            onClick={() =>
              handleLocalFilterChange("kitchen", !localFilters.kitchen)
            }
            type="button"
          >
            <Coffee className={styles.icon} />
            <span>Kitchen</span>
          </button>

          <button
            className={`${styles.equipmentButton} ${
              localFilters.TV ? styles.active : ""
            }`}
            onClick={() => handleLocalFilterChange("TV", !localFilters.TV)}
            type="button"
          >
            <Tv className={styles.icon} />
            <span>TV</span>
          </button>

          <button
            className={`${styles.equipmentButton} ${
              localFilters.bathroom ? styles.active : ""
            }`}
            onClick={() =>
              handleLocalFilterChange("bathroom", !localFilters.bathroom)
            }
            type="button"
          >
            <Bath className={styles.icon} />
            <span>Bathroom</span>
          </button>
        </div>

        {/* Vehicle Type */}
        <h4 className={styles.subsectionTitle}>Vehicle type</h4>
        <div className={styles.vehicleTypeGrid}>
          <button
            className={`${styles.typeButton} ${
              localFilters.form === "panelTruck" ? styles.active : ""
            }`}
            onClick={() =>
              handleLocalFilterChange(
                "form",
                localFilters.form === "panelTruck" ? "" : "panelTruck"
              )
            }
            type="button"
          >
            <Car className={styles.icon} />
            <span>Van</span>
          </button>

          <button
            className={`${styles.typeButton} ${
              localFilters.form === "fullyIntegrated" ? styles.active : ""
            }`}
            onClick={() =>
              handleLocalFilterChange(
                "form",
                localFilters.form === "fullyIntegrated" ? "" : "fullyIntegrated"
              )
            }
            type="button"
          >
            <LayoutGrid className={styles.icon} />
            <span>Fully Integrated</span>
          </button>

          <button
            className={`${styles.typeButton} ${
              localFilters.form === "alcove" ? styles.active : ""
            }`}
            onClick={() =>
              handleLocalFilterChange(
                "form",
                localFilters.form === "alcove" ? "" : "alcove"
              )
            }
            type="button"
          >
            <Grid3X3 className={styles.icon} />
            <span>Alcove</span>
          </button>
        </div>
      </div>

      {/* Search Button */}
      <button
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={disabled}
        type="button"
      >
        <Search className={styles.searchIcon} />
        Search
      </button>
    </div>
  );
};

export default FiltersPanel;
