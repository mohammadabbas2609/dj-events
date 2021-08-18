import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvents } from "../actions/eventAction";
import EventShow from "../components/EventShow";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";

const Events = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();

  const { title } = useParams();

  function setPage(page) {
    setPageNum(+page);
  }

  useEffect(() => {
    dispatch(getAllEvents(pageNum, title ? title : ""));
  }, [dispatch, pageNum, title]);

  const allEvent = useSelector(state => state.allEvent);

  const { events, loading, pages, error } = allEvent;

  return (
    <section className="events container">
      {!title && <h3 className="event-header">All Events</h3>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {events && (
            <>
              {title && (
                <div className="search-results">
                  <Link to="/events" className="btn">
                    Go Back
                  </Link>
                  <h3 style={{ margin: "1rem 0" }}>
                    Search results for {title}
                  </h3>
                  <p>Total Result : {events.length}</p>
                </div>
              )}
              {events.map(show => (
                <EventShow key={show._id} show={show} />
              ))}
              {!title && <Paginate pages={pages} setPage={setPage} />}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Events;
