import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Survey from "./pages/Survey";
import Result from "./pages/Results";
import PathDetails from "./pages/PathDetails";


export default function App() {
  return (
    <Router>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/result" element={<Result />} />
          <Route path="/pathDetails" element={<PathDetails />} />
        </Routes>

    </Router>
  );
}
