import type { Metadata } from "next";
import { ErrorMessage } from "@/components/atoms";
import { Table } from "@/components/organisms";
import { API_URL } from "@/lib/constants";
import { fetchStatistics } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Statistics",
  description: "Statistics about the brands in the fashion collection",
};

type Column<T> = {
  key: keyof T;
  header: string;
  format?: (value: unknown) => React.ReactNode;
};

type TableComponentProps<T> = {
  title: string;
  data: T[];
  columns: Column<T>[];
};

const TableComponent: React.FC<TableComponentProps<[string, unknown]>> = ({
  title,
  data,
  columns,
}) => (
  <div className="mb-8">
    <h2 className="text-2xl mb-4">{title}</h2>
    <Table data={data} columns={columns} />
  </div>
);

const StatisticsPage: React.FC = async () => {
  const { status, data, error } = await fetchStatistics();

  if (status === "failed" || !data) {
    return (
      <ErrorMessage
        message={error || "An unknown error occurred"}
        className="text-xl"
      />
    );
  }

  const tableData = [
    {
      title: "Brands with most products under 40 euros",
      data: Object.entries(data.brandWithMostProductsUnder40),
      columns: [
        { key: 0, header: "Brand" },
        {
          key: 1,
          header: "Product Count",
          format: (value: unknown) => value as number,
        },
      ],
    },
    {
      title: "Brands with size selection",
      data: Object.entries(data.brandWithLargestSizeSelection),
      columns: [
        { key: 0, header: "Brand" },
        {
          key: 1,
          header: "Size Count",
          format: (value: unknown) => value as number,
        },
      ],
    },
    {
      title: "Brands with average price for size 32",
      data: Object.entries(data.brandWithLowestAveragePriceForSize32),
      columns: [
        { key: 0, header: "Brand" },
        {
          key: 1,
          header: "Average Price",
          format: (value: unknown) => Number((value as number).toFixed(2)),
        },
      ],
    },
  ];

  return (
    <section className="p-6">
      <h1 className="text-4xl mb-6">Statistics</h1>
      {tableData.map((table) => (
        <TableComponent key={table.title} {...table} />
      ))}
    </section>
  );
};

export default StatisticsPage;
