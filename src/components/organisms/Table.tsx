type TableProps<T> = {
  data: T[];
  columns: {
    key: keyof T;
    header: string;
    format?: (value: any) => React.ReactNode;
  }[];
};

const Table = <T,>({ data, columns }: TableProps<T>) => (
  <table className="w-full table-auto">
    <thead>
      <tr>
        {columns.map((column) => (
          <th className="px-4 py-2" key={column.key as string}>
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          {columns.map((column) => (
            <td className="border px-4 py-2" key={column.key as string}>
              {column.format
                ? column.format(item[column.key])
                : String(item[column.key])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
