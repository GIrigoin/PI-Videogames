const Pagination = ({ currentPage, LAST_PAGE, handleClick }) => {
  const pages = Array.from(
    { length: LAST_PAGE },
    (element, index) => index + 1
  );
  return LAST_PAGE > 1 ? (
    <div>
      <button name="first" disabled={currentPage === 1} onClick={handleClick}>
        ◀◀
      </button>
      <button name="prev" disabled={currentPage - 1 < 1} onClick={handleClick}>
        ◀
      </button>
      {pages.map((page) => (
        <button
          name={page}
          disabled={page === currentPage}
          onClick={handleClick}
        >
          {page}
        </button>
      ))}
      <button
        name="next"
        disabled={currentPage + 1 > LAST_PAGE}
        onClick={handleClick}
      >
        ▶
      </button>

      <button
        name="last"
        disabled={currentPage === LAST_PAGE}
        onClick={handleClick}
      >
        ▶▶
      </button>
    </div>
  ) : null;
};

export default Pagination;
