import { Route, Routes } from "react-router-dom";
import Home from "screens/Home/Home";
import Recipe from "./screens/Recipe/Recipe";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe" element={<Recipe />} />
    </Routes>
  );
}
