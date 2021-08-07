import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.scss";

import NavigationBar from "./shared/components/NavigationBar/NavigationBar";

import Search from "./search/pages/Search";
import SearchResult from "./search/pages/SearchResult";
import SearchItemDetail from "./search/pages/SearchItemDetail";

function App() {
  return (
    <Router>
      <NavigationBar />
      <main className="container" aria-label="Main content">
        <Switch>
          <Route path="/" exact>
            <Search />
          </Route>
          <Route path="/items" exact>
            <SearchResult />
          </Route>
          <Route path="/items/:id" exact>
            <SearchItemDetail />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
