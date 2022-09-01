import "../css/App.css";
import Toolbar from "../components/Toolbar";
import Dock from "../components/Dock";
import ArrowsCarousel from "../components/ArrowsCarousel";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Dock />
      <ArrowsCarousel />
    </div>
  );
}

export default App;
