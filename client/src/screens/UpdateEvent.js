import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getEventDetails, updateEvent } from "../actions/eventAction";
import { Image } from "cloudinary-react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "../styles/addevent.css";

function convertDate() {
  const date = new Date();
  return `${date.getFullYear}-${date.getMonth}-${date.getDate}`;
}

function _24hrsto12hrs(time) {
  let a = !(+time.substr(0, 2) < 12) ? "PM" : "AM";
  let _12hrstime = +time.substr(0, 2);
  let _12hrsformat = (a === "PM" ? _12hrstime % 12 || 12 : time).toString();
  return a === "PM"
    ? `${
        _12hrsformat.length === 1 ? `0${_12hrsformat}` : _12hrsformat
      }:${time.slice(3)} ${a}`
    : `${_12hrsformat} ${a}`;
}

const UpdateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [performers, setPerformers] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [base64Img, setBase64Img] = useState("");

  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { error, loading, event } = useSelector(state => state.eventDetail);
  const {
    error: updateError,
    loading: updateLoading,
    success,
  } = useSelector(state => state.updateEvent);

  useEffect(() => {
    let pushed = true;
    if (success) {
      pushed && history.push("/profile");
    }
    return function () {
      pushed = false;
    };
  }, [success, history]);

  useEffect(() => {
    if (event && event.title) {
      setTitle(event.title);
      setDescription(event.description);
      setVenue(event.venue);
      setPerformers(event.performers);
      setDate(event.date.substr(0, 10));
      setTime(event.time.substr(0, 5));
    } else {
      dispatch(getEventDetails(id));
    }
  }, [dispatch, event, id]);

  async function convertToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64Img(reader.result);
    };
  }

  if (image) {
    convertToBase64(image);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    let _12hrTime = _24hrsto12hrs(time);
    dispatch(
      updateEvent(
        title,
        description,
        venue,
        performers,
        date,
        _12hrTime,
        base64Img,
        id
      )
    );
  };

  return (
    <div className="add-event container">
      <h3>Update Event</h3>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {updateLoading && <Loader />}
      {updateError && <Message variant="danger">{updateError}</Message>}
      <div className="create-form">
        <form onSubmit={handleSubmit}>
          <div className="left-side">
            <div className="form-controller">
              <input
                placeholder="Enter title"
                type="text"
                onChange={e => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>
            <div className="form-controller">
              <textarea
                type="text"
                placeholder="Enter description"
                onChange={e => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>
            <div className="form-controller">
              <input
                type="text"
                placeholder="Enter performers name"
                onChange={e => setPerformers(e.target.value)}
                value={performers}
                required
              />
            </div>
            <div className="form-controller">
              <input
                type="date"
                min={convertDate()}
                onChange={e => setDate(e.target.value)}
                value={date}
                required
              />
            </div>
            <div className="form-controller">
              <input
                type="time"
                onChange={e => setTime(e.target.value)}
                value={time}
                required
              />
            </div>
          </div>
          <div className="right-side">
            <div className="form-controller">
              <input
                type="text"
                placeholder="Enter Venue"
                onChange={e => setVenue(e.target.value)}
                value={venue}
                required
              />
            </div>
            <div className="form-controller">
              <input
                type="file"
                placeholder="Enter Event Image"
                onChange={e => setImage(e.target.files[0])}
              />
            </div>
            <div className="form-controller">
              {base64Img ? (
                <img src={base64Img} alt={title} />
              ) : (
                <Image
                  cloudName="abbas-cloud-space"
                  public_id={event.image}
                  crop="scale"
                  secure
                />
              )}
            </div>
          </div>
          <button type="submit" className="btn">
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
