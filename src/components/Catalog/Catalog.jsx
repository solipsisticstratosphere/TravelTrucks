import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { setFilters } from "../../redux/campers/slice";
import CamperCard from "../CamperCard/CamperCard";
import FiltersPanel from "../FiltersPanel/FiltersPanel";
import styles from "./Catalog.module.css";
import { useEffect } from "react";

const Catalog = () => {
  const dispatch = useDispatch();
  const { items, total, currentPage, filters, favorites, loading, error } =
    useSelector((state) => state.campers);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(
        fetchCampers({
          page: 1,
          filters,
        })
      );
    }
  }, [dispatch]);

  const handleFilterChange = async (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(
      fetchCampers({
        page: 1,
        filters: newFilters,
      })
    );
  };

  const handleLoadMore = () => {
    if (!loading && items.length < total) {
      dispatch(
        fetchCampers({
          page: currentPage,
          filters,
        })
      );
    }
  };
  const renderCamperCard = (camper, index) => (
    <CamperCard
      key={`${camper.id}-${index}`}
      camper={camper}
      isFavorite={favorites.includes(camper.id)}
    />
  );
  const showLoadMore = !loading && items.length > 0 && items.length < total;

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <FiltersPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          disabled={loading}
        />

        <div className={styles.campersSection}>
          {loading && items.length === 0 && (
            <div className={styles.loading}>Loading...</div>
          )}
          {error && <div className={styles.error}>{error}</div>}
          {!loading && items.length === 0 ? (
            <div className={styles.noResults}>No campers found</div>
          ) : (
            <div className={styles.campersGrid}>
              {items.map(renderCamperCard)}
            </div>
          )}
          {loading && items.length > 0 && (
            <div className={styles.loadingMore}>Loading more...</div>
          )}
          {showLoadMore && (
            <button
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
              disabled={loading}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
