import { useState } from "react";
import styles from "./FiltersPanel.module.css";
import { Search } from "lucide-react";
import SvgIcon from "../../utils/SvgIcon";

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
        <h3 className={styles.sectionTitleLocation}>Location</h3>
        <div className={styles.locationInputWrapper}>
          <input
            type="text"
            value={localFilters.location}
            onChange={(e) =>
              handleLocalFilterChange("location", e.target.value)
            }
            placeholder="City"
            className={styles.locationInput}
            disabled={disabled}
          />
          <SvgIcon name="map" className={styles.locationInputIcon} />
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
            <SvgIcon name="wind" className={styles.icon} />
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
            <SvgIcon name="diagram" className={styles.icon} />
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
            <SvgIcon name="cup-hot" className={styles.icon} />
            <span>Kitchen</span>
          </button>

          <button
            className={`${styles.equipmentButton} ${
              localFilters.TV ? styles.active : ""
            }`}
            onClick={() => handleLocalFilterChange("TV", !localFilters.TV)}
            type="button"
          >
            <SvgIcon name="tv" className={styles.icon} />
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
            <SvgIcon name="ph-shower" className={styles.icon} />
            <span>Bathroom</span>
          </button>
        </div>

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
            <SvgIcon name="bi-grid-1x2" className={styles.icon} />
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
            <SvgIcon name="bi-grid" className={styles.icon} />
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
            <SvgIcon name="bi-grid-3x3-gap" className={styles.icon} />
            <span>Alcove</span>
          </button>
        </div>
      </div>

      <button
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={disabled}
        type="button"
      >
        Search
      </button>
    </div>
  );
};

export default FiltersPanel;
