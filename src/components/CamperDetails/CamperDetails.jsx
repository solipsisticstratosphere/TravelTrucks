import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CamperDetails.module.css";
import SvgIcon from "../../utils/SvgIcon";
import { fetchCamperDetails } from "../../redux/campers/operations";
import { useParams } from "react-router-dom";

const CamperDetails = () => {
  const [activeTab, setActiveTab] = useState("features");
  const dispatch = useDispatch();
  const { id } = useParams();

  const selectedCamper = useSelector((state) => state.campers.selectedCamper);
  const loading = useSelector((state) => state.campers.loading);
  const error = useSelector((state) => state.campers.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className={styles.loading}>Loading camper details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!selectedCamper) {
    return <div className={styles.notFound}>Camper not found</div>;
  }

  const {
    form,
    microwave,
    gas,
    water,
    refrigerator,
    bathroom,
    radio,
    AC,
    kitchen,
    engine,
    transmission,
    name,
    price,
    rating,
    location,
    description,
    gallery,
    reviews,
    length,
    width,
    height,
    tank,
    consumption,
  } = selectedCamper;

  const formatMeasurement = (value) => {
    return value.replace(/(\d)([a-zA-Z])/g, "$1 $2");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.name}>{name}</p>
        <div className={styles.reviewsHeader}>
          <div className={styles.rating}>
            <SvgIcon name="rating" className={styles.iconRating} />
            <div className={styles.ratingWrapper}>
              {rating}({reviews.length} Reviews)
            </div>
          </div>

          <div className={styles.location}>
            {" "}
            <SvgIcon name="map" className={styles.iconRating} />
            {location}
          </div>
        </div>
        <div className={styles.price}>€{price}.00</div>
      </div>

      <div className={styles.gallery}>
        {gallery.map((image, index) => (
          <img
            key={index}
            src={image.thumb}
            alt={`Camper view ${index + 1}`}
            className={styles.galleryImage}
          />
        ))}
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "features" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "reviews" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className={styles.tabsFormContainer}>
        {activeTab === "features" ? (
          <div className={styles.features}>
            <div className={styles.featuresList}>
              {transmission && (
                <span className={styles.feature}>
                  <SvgIcon name="diagram" className={styles.icon} />
                  {transmission.charAt(0).toUpperCase() + transmission.slice(1)}
                </span>
              )}
              {engine && (
                <span className={styles.feature}>
                  <SvgIcon name="fuel-pump" className={styles.icon} />
                  {engine.charAt(0).toUpperCase() + engine.slice(1)}
                </span>
              )}
              {kitchen && (
                <span className={styles.feature}>
                  <SvgIcon name="cup-hot" className={styles.icon} />
                  Kitchen
                </span>
              )}
              {AC && (
                <span className={styles.feature}>
                  <SvgIcon name="wind" className={styles.icon} />
                  AC
                </span>
              )}
              {radio && (
                <span className={styles.feature}>
                  <SvgIcon name="radio" className={styles.icon} />
                  Radio
                </span>
              )}
              {bathroom && (
                <span className={styles.feature}>
                  <SvgIcon name="ph-shower" className={styles.icon} />
                  Bathroom
                </span>
              )}
              {refrigerator && (
                <span className={styles.feature}>
                  <SvgIcon
                    name="solar-fridge-outline"
                    className={styles.icon}
                  />
                  Refrigerator
                </span>
              )}
              {microwave && (
                <span className={styles.feature}>
                  <SvgIcon name="lucide-microwave" className={styles.icon} />
                  Microwave
                </span>
              )}
              {gas && (
                <span className={styles.feature}>
                  <SvgIcon name="hugicons-gas-stove" className={styles.icon} />
                  Gas
                </span>
              )}
              {water && (
                <span className={styles.feature}>
                  <SvgIcon name="water" className={styles.icon} />
                  Water
                </span>
              )}
            </div>

            <div className={styles.vehicleDetails}>
              <h3>Vehicle details</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailRow}>
                  <span>Form</span>
                  <span>{form.charAt(0).toUpperCase() + form.slice(1)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Length</span>
                  <span>{formatMeasurement(length)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Width</span>
                  <span>{formatMeasurement(width)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Height</span>
                  <span>{formatMeasurement(height)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Tank</span>
                  <span>{formatMeasurement(tank)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Consumption</span>
                  <span>{consumption}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.reviews}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInitial}>
                    {review.reviewer_name[0].toUpperCase()}
                  </div>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerName}>
                      {review.reviewer_name}
                    </div>
                    <div className={styles.reviewRating}>
                      {Array.from({ length: 5 }).map((_, index) =>
                        index < review.reviewer_rating ? (
                          <SvgIcon
                            key={index}
                            name="rating"
                            className={styles.iconRating}
                          />
                        ) : (
                          <SvgIcon
                            key={index}
                            name="ratingGrey"
                            className={styles.iconRating}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        <form className={styles.bookingForm}>
          <h3>Book your campervan now</h3>
          <p>Stay connected! We are always ready to help you.</p>
          <input type="text" placeholder="Name*" className={styles.input} />
          <input type="email" placeholder="Email*" className={styles.input} />
          <input
            type="text"
            placeholder="Booking date*"
            className={styles.input}
          />
          <textarea placeholder="Comment" className={styles.textarea} />
          <button type="submit" className={styles.submitButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CamperDetails;
