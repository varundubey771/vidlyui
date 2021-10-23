import logo from "./logo.svg";
import "./App.css";
import Movies from "./components/movies";
import Customers from "./components/customers";
import NavBar from "./components/navbar";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/common/loginForm";
import Register from "./components/register";
import AddMovies from "./components/addMovies";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <main role="main" className="container">
      <ToastContainer></ToastContainer>
      <NavBar></NavBar>
      <Switch>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/movies/:id" component={AddMovies}></Route>
        <Route path="/rentals" component={Rentals}></Route>

        <Route path="/customers" component={Customers}></Route>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/not-found" component={NotFound}></Route>

        <Redirect from="/" exact to="/movies"></Redirect>
        <Redirect to="/not-found"></Redirect>
      </Switch>
    </main>
  );
}

export default App;
