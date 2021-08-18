import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { getEventDetails } from "../actions/eventAction";
import { FiEdit, FiTrash } from "react-icons/fi";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Map from "../components/Map";
import { Image } from "cloudinary-react";
import "../styles/eventdetail.css";

import axios from "axios";

const EventDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEventDetails(id));
  }, [dispatch, id]);

  const { loading, error, event } = useSelector(state => state.eventDetail);
  const { userInfo } = useSelector(state => state.login);

  async function handleDelete(id) {
    try {
      if (window.confirm("are you sure ?")) {
        await axios.delete(`/api/event/${id}`);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {event && (
            <div className="event-details container">
              <Link className="btn" style={{ marginBottom: "0.5rem" }} to="/">
                Go Back
              </Link>
              <div className="date">
                {event.date && (
                  <>
                    {event.date.substr(0, 10)} at {event.time}
                  </>
                )}
              </div>
              {userInfo && userInfo._id === event.user && (
                <div className="update-delete-icon">
                  <span className="icon">
                    <FiEdit
                      onClick={() => history.push(`/updateevent/${event._id}`)}
                    />
                  </span>
                  <span className="icon">
                    <FiTrash onClick={() => handleDelete(event._id)} />
                  </span>
                </div>
              )}
              <div className="title">
                <h3>{event.title}</h3>
              </div>
              <div className="image">
                <Image
                  cloudName="abbas-cloud-space"
                  public_id={event.image}
                  crop="scale"
                  secure
                />
              </div>
              <div className="performers">
                <h3>Performers</h3>
                <p className="content-perform">{event.performers}</p>
              </div>
              <div className="description">
                <h3>Description</h3>
                <p className="content-desc">{event.description}</p>
              </div>
              <div className="venue">
                <h3>Venue</h3>
                <p className="content-venue">{event.venue}</p>
              </div>
              <div className="map">
                {event.location && (
                  <Map
                    longitude={event.location[0]}
                    latitude={event.location[1]}
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EventDetail;
