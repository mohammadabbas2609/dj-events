import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AddEvent from "./screens/AddEvent";
import EventDetail from "./screens/EventDetail";
import Events from "./screens/Events";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UpdateEvent from "./screens/UpdateEvent";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <PrivateRoute path="/profile" component={ProfileScreen} />
        <Route path="/events/:title" component={Events} />
        <Route path="/events" component={Events} />
        <Route path="/create-event" component={AddEvent} />
        <Route path="/event/:id" component={EventDetail} />
        <Route path="/updateevent/:id" component={UpdateEvent} />
      </Switch>
    </Router>
  );
}

export default App;
