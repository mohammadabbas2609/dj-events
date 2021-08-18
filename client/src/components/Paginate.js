import "../styles/paginate.css";

const Paginate = ({ pages, setPage }) => {
  return (
    <div className="pages">
      {[...Array(pages).keys()].map(page => (
        <div
          className="page"
          key={page + 1}
          onClick={e => {
            setPage(e.target.innerText);
          }}
        >
          {page + 1}
        </div>
      ))}
    </div>
  );
};

export default Paginate;
