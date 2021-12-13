import "./App.css";
import { Route } from "wouter";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import Fragances from "./components/Fragances/Fragances";
import Orders from "./components/Orders/Orders";
import Users from "./components/Users/Users";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Route component={Form} path="/" />
      <Route component={Home} path="/dashboard" />
      <Route component={Fragances} path="/fragances"></Route>
      <Route component={Orders} path="/orders"></Route>
      <Route component={Users} path="/users"></Route>
      <Route component={Profile} path="/profile"></Route>
    </div>
  );
}

export default App;
