import './index.css';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import End from './components/End';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App col d-flex justify-content-center">
        <Switch>
          <Route exact path = "/">
            <LoginRegister></LoginRegister>
          </Route>
          <Route exact path = "/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path = "/play">
              
              <Game></Game>
          </Route>
          <Route exact path = "/end">
            <End></End>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
