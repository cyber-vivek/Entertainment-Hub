import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Header} from './components/Header/Header';
import SimpleBottomNavigation  from "./components/MainNav";
import { Container } from '@material-ui/core';
import {Trending} from './pages/Trending/Trending'
import {Movies} from './pages/Movies/Movies'
import {Series} from './pages/Series/Series'
import {Search} from './pages/Search/Search'
import MoveDetail from './pages/MovieDetail/MoveDetail';


function App() {
  return (
    <BrowserRouter>
      <Header/>
    <div className="App">
      <Container>
        <Switch>
          <Route path='/' component={Trending} exact/>
          <Route path='/movies' component={Movies}/>
          <Route path='/series' component={Series}/>
          <Route path='/search' component={Search}/>
          <Route path='/detail/:content/:id' component={MoveDetail}/>
        </Switch>
      </Container>
    </div>
    <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
