import { useTable,useSortBy } from "react-table";
import { useMemo } from "react";

const DataTable = ({ column, Data }) => {
  const columns = useMemo(() => column, [Data]);
  const data = useMemo(() => Data, [Data]);
  const tableInstance = useTable({
    columns,
    data,
  },useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return    (


    <div>
    <table {...getTableProps()} className="w-full">
      <thead className="bg-black">
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className="bg-black rounded-lg border-none"
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="p-9 text-white "
              >
                {column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? '⬇':"⬆"):""}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="border-b-2 border-b-gray-900  hover:bg-gray-400"
            >
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="text-center p-2 font-semibold font-sans">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
   
  );
};
export default DataTable;
