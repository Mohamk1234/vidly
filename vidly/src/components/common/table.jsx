import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table table-striped table-dark">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
