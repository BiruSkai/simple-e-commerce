import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from './components/login/Register';
import Home from './components/Home';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <div className="content">
        <Router>
          <Switch>
            <Route path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign_up" component={Register} />
            <Route exact path="/google-login" component={GoogleLogin} />
            <Route exact path="/google-login/user-register" component={GoogleUserRegister} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
