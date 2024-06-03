import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from './components/login/Register';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <div className="content">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sign_up" component={Register} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
