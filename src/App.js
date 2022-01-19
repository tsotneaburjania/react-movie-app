import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import FilmDetailPage from './pages/FilmDetailPage';
import HomePage from './pages/HomePage';


function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />}>
            </Route>
            <Route exact path="/:film_id" element={<FilmDetailPage />}>
            </Route>
          </Routes>
        </Router>
        <div className="footer">
          <p>Assembled by&nbsp;<a href="https://github.com/MonolithOfficial">MonolithOfficial</a>&nbsp;(<a href="https://github.com/tsotneaburjania">Tsotne Aburjania</a>)</p>
        </div>
    </div>
  );
}

export default App;
