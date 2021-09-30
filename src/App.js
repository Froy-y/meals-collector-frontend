import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NewForm from './components/NewForm'
import MealList from './components/MealList';
import EditForm from './components/EditForm';

const App = () => {
  return (
    <div>
      <h1>Meal Counter!</h1>
      <Router>
        <Switch>
          <Route exact path = "/meals/new" render={(routerProps)=> <NewForm {...routerProps} />} />
          <Route exact path = "/meals" render={()=> <MealList />} />
          <Route exact path = "/meals/:id/edit" render={(routerProps)=> <EditForm {...routerProps} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
