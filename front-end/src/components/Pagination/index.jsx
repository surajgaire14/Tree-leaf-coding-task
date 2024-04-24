/* eslint-disable react/prop-types */
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];
  for (let i = 0; i <= Math.floor(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  return (
    <div className=" py-6">
      <ul className="flex justify-end gap-3">
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <button onClick={() => paginate(number + 1)}>{number + 1}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
