import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLatestEvent } from "../actions/eventAction";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ShowCase from "../components/ShowCase";
import EventShow from "../components/EventShow";
import Message from "../components/Message";

import "../styles/home.css";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, events } = useSelector(state => state.event);

  useEffect(() => {
    dispatch(getLatestEvent());
  }, [dispatch]);

  return (
    <>
      <ShowCase />
      <section className="events container">
        <h3 className="event-header">Upcoming Events</h3>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {events.map(show => (
              <EventShow key={show._id} show={show} />
            ))}
            <Link to="/events" style={{ marginTop: "0.5rem" }} className="btn">
              All Events
            </Link>
          </>
        )}
      </section>
    </>
  );
};

export default HomeScreen;
