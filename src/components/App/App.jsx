import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<CamperDetailsPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
