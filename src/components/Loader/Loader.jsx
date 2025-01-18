import { PulseLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = ({
  size = 15,
  color = "#EF4444",
  loading = true,
  speedMultiplier = 1,
  className = "",
}) => {
  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.container} ${className}`}>
        <PulseLoader
          color={color}
          loading={loading}
          size={size}
          speedMultiplier={speedMultiplier}
          aria-label="Loading..."
        />
      </div>
    </div>
  );
};

export default Loader;
