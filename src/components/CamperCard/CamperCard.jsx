import { useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/campers/slice";
import styles from "./CamperCard.module.css";
import SvgIcon from "../../utils/SvgIcon";

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
              <div className={styles.rating}>
                <SvgIcon name="rating" className={styles.iconRating} />
                <div className={styles.ratingWrapper}>
                  {camper.rating}({camper.reviews.length} Reviews)
                </div>
              </div>

              <div className={styles.location}>
                {" "}
                <SvgIcon name="map" className={styles.iconRating} />
                {camper.location}
              </div>
            </div>
          </div>
          <div className={styles.priceSection}>
            <span className={styles.price}>€{camper.price}.00</span>
            <button
              onClick={handleToggleFavorite}
              className={styles.favoriteButton}
              type="button"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isFavorite ? (
                <SvgIcon name="heart" className={styles.iconHeart} />
              ) : (
                <SvgIcon name="heart" className={styles.icon} />
              )}
            </button>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {camper.transmission && (
            <span className={styles.feature}>
              <SvgIcon name="diagram" className={styles.icon} />
              {camper.transmission.charAt(0).toUpperCase() +
                camper.transmission.slice(1)}
            </span>
          )}
          {camper.engine && (
            <span className={styles.feature}>
              <SvgIcon name="fuel-pump" className={styles.icon} />
              {camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)}
            </span>
          )}
          {camper.kitchen && (
            <span className={styles.feature}>
              <SvgIcon name="cup-hot" className={styles.icon} />
              Kitchen
            </span>
          )}
          {camper.AC && (
            <span className={styles.feature}>
              <SvgIcon name="wind" className={styles.icon} />
              AC
            </span>
          )}
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
