import './index.css';
import LoginRegister from './components/LoginRegister';
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
      <div className="App">
        <Switch>
          <Route exact path = "/">
            <LoginRegister></LoginRegister>
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
