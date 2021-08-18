import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

const EventShow = ({ show }) => {
  return (
    <div className="card">
      <div className="card-img">
        <Image
          cloudName="abbas-cloud-space"
          public_id={show.image}
          q_auto="good"
          crop="scale"
          secure
        />
      </div>
      <div className="card-content">
        <p>
          {show.date.substr(0, 10)} at {show.time}
        </p>
        <h4>{show.title}</h4>
      </div>
      <div className="card-btn">
        <Link to={`/event/${show._id}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
};

export default EventShow;
