import "./App.css";
import { NavBar } from "./components/navbar/NavBar";
import { Feed } from './pages/feed/Feed';

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="app__content">
        <Feed />
      </div>
    </div>
  );
};

export default App;
