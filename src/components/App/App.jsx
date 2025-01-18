import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import styles from "./App.module.css";
import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../../pages/CatalogPage/CatalogPage"));
const CamperPage = lazy(() => import("../../pages/CamperPage/CamperPage"));

function App() {
  return (
    <div className={styles.app}>
      <Toaster position="top-right" />

      <Suspense fallback={<Loader color="#EF4444" size={15} />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="catalog/:id" element={<CamperPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
