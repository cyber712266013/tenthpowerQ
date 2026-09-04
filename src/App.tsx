import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CatalogPage from "./pages/CatalogPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
