import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CamperDetails.module.css";
import SvgIcon from "../../utils/SvgIcon";
import { fetchCamperDetails } from "../../redux/campers/operations";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";
import { BookingSchema } from "../../utils/Schemas";
import FormCalendarField from "../Calendar/Calendar";

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
    return <Loader color="#EF4444" size={15} />;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!selectedCamper) {
    return <div className={styles.notFound}>Camper not found</div>;
  }

  const formatMeasurement = (value) => {
    return value.replace(/(\d)([a-zA-Z])/g, "$1 $2");
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log("Form values:", values);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Booking successfully submitted!", {
        duration: 4000,
        position: "top-right",
      });

      resetForm();
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.", {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const camper = selectedCamper;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.name}>{camper.name}</p>
        <div className={styles.reviewsHeader}>
          <div className={styles.rating}>
            <SvgIcon name="rating" className={styles.iconRating} />
            <div className={styles.ratingWrapper}>
              {camper.rating} ({camper.reviews.length} Reviews)
            </div>
          </div>
          <div className={styles.location}>
            <SvgIcon name="map" className={styles.iconRating} />
            {camper.location}
          </div>
        </div>
        <div className={styles.price}>€{camper.price}.00</div>
      </div>

      <div className={styles.gallery}>
        {camper.gallery.map((image, index) => (
          <img
            key={index}
            src={image.thumb}
            alt={`Camper view ${index + 1}`}
            className={styles.galleryImage}
          />
        ))}
      </div>

      <p className={styles.description}>{camper.description}</p>

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
                  {camper.engine.charAt(0).toUpperCase() +
                    camper.engine.slice(1)}
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
              {camper.radio && (
                <span className={styles.feature}>
                  <SvgIcon name="radio" className={styles.icon} />
                  Radio
                </span>
              )}
              {camper.bathroom && (
                <span className={styles.feature}>
                  <SvgIcon name="ph-shower" className={styles.icon} />
                  Bathroom
                </span>
              )}
              {camper.refrigerator && (
                <span className={styles.feature}>
                  <SvgIcon
                    name="solar-fridge-outline"
                    className={styles.icon}
                  />
                  Refrigerator
                </span>
              )}
              {camper.microwave && (
                <span className={styles.feature}>
                  <SvgIcon name="lucide-microwave" className={styles.icon} />
                  Microwave
                </span>
              )}
              {camper.gas && (
                <span className={styles.feature}>
                  <SvgIcon name="hugicons-gas-stove" className={styles.icon} />
                  Gas
                </span>
              )}
              {camper.water && (
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
                  <span>
                    {camper.form.charAt(0).toUpperCase() + camper.form.slice(1)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span>Length</span>
                  <span>{formatMeasurement(camper.length)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Width</span>
                  <span>{formatMeasurement(camper.width)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Height</span>
                  <span>{formatMeasurement(camper.height)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Tank</span>
                  <span>{formatMeasurement(camper.tank)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Consumption</span>
                  <span>{camper.consumption}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.reviews}>
            {camper.reviews.map((review, index) => (
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

        <Formik
          initialValues={{
            name: "",
            email: "",
            date: "",
            comment: "",
          }}
          validationSchema={BookingSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.bookingForm}>
              <h3>Book your campervan now</h3>
              <p>Stay connected! We are always ready to help you.</p>

              <div className={styles.inputWrapper}>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name*"
                  className={`${styles.input} ${
                    errors.name && touched.name ? styles.errorInput : ""
                  }`}
                />
                {errors.name && touched.name && (
                  <div className={styles.errorText}>{errors.name}</div>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className={`${styles.input} ${
                    errors.email && touched.email ? styles.errorInput : ""
                  }`}
                />
                {errors.email && touched.email && (
                  <div className={styles.errorText}>{errors.email}</div>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <FormCalendarField
                  name="date"
                  placeholder="Booking date*"
                  className={`${styles.input} ${
                    errors.date && touched.date ? styles.errorInput : ""
                  }`}
                />
                {errors.date && touched.date && (
                  <div className={styles.errorText}>{errors.date}</div>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <Field
                  as="textarea"
                  name="comment"
                  placeholder="Comment"
                  className={`${styles.textarea} ${
                    errors.comment && touched.comment ? styles.errorInput : ""
                  }`}
                />
                {errors.comment && touched.comment && (
                  <div className={styles.errorText}>{errors.comment}</div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CamperDetails;
