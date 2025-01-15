import { useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/campers/slice";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper, isFavorite }) => {
  const dispatch = useDispatch();

  const formatedPrice = new Intl.NumberFormat("de-DE", {
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(camper.price);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(camper.id));
  };

  return (
    <div className={styles.card}>
      <img
        src={camper.gallery[0].thumb}
        alt={camper.name}
        className={styles.image}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{camper.name}</h3>
            <div className={styles.reviews}>
              {camper.reviews.length} Reviews • {camper.location}
            </div>
          </div>
          <div className={styles.priceSection}>
            <span className={styles.price}>{formatedPrice}</span>
            <button
              onClick={handleToggleFavorite}
              className={styles.favoriteButton}
              type="button"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          <span className={styles.feature}>🚗 {camper.transmission}</span>
          <span className={styles.feature}>⛽ {camper.engine}</span>
          {camper.kitchen && <span className={styles.feature}>🍳 Kitchen</span>}
          {camper.AC && <span className={styles.feature}>❄️ AC</span>}
        </div>

        <button
          className={styles.showMoreButton}
          onClick={() => window.open(`/catalog/${camper.id}`, "_blank")}
          type="button"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
