import { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (search) {
      setSearch("");
      history.push(`/events/${search}`);
    } else {
      history.push(`/events`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="search"
        placeholder="Search Events.."
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <button className="btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
