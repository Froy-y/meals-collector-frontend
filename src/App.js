import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NewForm from './components/NewForm'
import MealList from './components/MealList';
import EditForm from './components/EditForm';
import MealDetail from './components/MealDetail'
import { Basket } from 'react-bootstrap-icons'
import { Navbar, Container } from 'react-bootstrap'

const App = () => {
  return (
    <div>
      <div className="nav-bar">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/meals" className="brand">
              <Basket />  <h4>Meal Counter</h4>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <Router>
        <Switch>
          <Route exact path = "/meals/new" render={(routerProps)=> <NewForm {...routerProps} />} />
          <Route exact path = "/meals" render={()=> <MealList />} />
          <Route exact path = "/meals/:id/edit" render={(routerProps)=> <EditForm {...routerProps} />} />
          <Route exact path = "/meals/:id" render={(routerProps)=> <MealDetail {...routerProps} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
