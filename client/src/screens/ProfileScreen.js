import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../actions/userAction";
import { Link } from "react-router-dom";
import "../styles/profile.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { myEvents } from "../actions/eventAction";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const { user, loading, error } = useSelector(state => state.getProfile);
  const { events, error: errorEvent } = useSelector(state => state.myEvents);

  const dispatch = useDispatch();

  // UseEffect  to handle profile request
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      dispatch(getProfile());
    }
  }, [dispatch, user]);

  // useEffect to handle profile event request
  useEffect(() => {
    dispatch(myEvents());
  }, [dispatch]);

  const handleSubmit = function (e) {
    e.preventDefault();
    if (confirmPassword !== password) {
      setPasswordMessage("Password doesn't match");
    } else {
      setPasswordMessage("");
      dispatch(updateProfile(name, email, password));
      dispatch(getProfile());
    }
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {passwordMessage && <Message variant="danger">{passwordMessage}</Message>}
      <main className="profile-info-container">
        <div className="profile-container">
          <Link to="/" className="btn">
            Go Back
          </Link>
          <form onSubmit={handleSubmit}>
            <h2>My Profile</h2>
            <div>
              <input
                type="text"
                onChange={e => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder="Enter your Name"
                required
              />
            </div>
            <div>
              <input
                type="email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                value={email}
                placeholder="Enter your Email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                value={password}
                placeholder="Enter your Password"
              />
            </div>
            <div>
              <input
                type="password"
                onChange={e => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                placeholder="Enter confirm password"
              />
            </div>
            <button type="submit" className="form btn">
              Update Profile
            </button>
          </form>
        </div>
        <div className="my-events">
          <h2>My Events</h2>
          {errorEvent && <Message variant="danger">{errorEvent}</Message>}
          {events &&
            events.map(event => (
              <div className="my-event" key={event._id}>
                <div className="event-info-profile">
                  <h3>{event.title}</h3>
                  <p>
                    {event.date.substr(0, 10)} at {event.time}
                  </p>
                  <Link to={`/event/${event._id}`} className="btn">
                    details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default ProfileScreen;
