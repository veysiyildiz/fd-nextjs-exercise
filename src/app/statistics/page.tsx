import type { Metadata } from "next";
import { ErrorMessage } from "@/components/atoms";
import { Table } from "@/components/organisms";
import { API_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Statistics",
  description: "Statistics about the brands in the fashion collection",
};

const StatisticsPage: React.FC = async () => {
  let status = "loading";
  let data;
  let error;

  try {
    const response = await fetch(`${API_URL}/api/statistics`);
    data = await response.json();
    status = "success";
  } catch (err) {
    status = "failed";
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "An unknown error occurred";
    }
  }

  if (status === "failed" || !data) {
    return (
      <ErrorMessage
        message={error || "An unknown error occurred"}
        className="text-xl"
      />
    );
  }
  return (
    <section className="p-6">
      <h1 className="text-4xl mb-6">Statistics</h1>
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Brands with product count under 40</h2>
        <Table
          data={Object.entries(data?.brandWithMostProductsUnder40)}
          columns={[
            { key: 0, header: "Brand" },
            { key: 1, header: "Count", format: (value) => value as number },
          ]}
        />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Brands with size selection</h2>
        <Table
          data={Object.entries(data?.brandWithLargestSizeSelection)}
          columns={[
            { key: 0, header: "Brand" },
            {
              key: 1,
              header: "Size Count",
              format: (value) => value as number,
            },
          ]}
        />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Brands with average price for size 32</h2>
        <Table
          data={Object.entries(data?.brandWithLowestAveragePriceForSize32)}
          columns={[
            { key: 0, header: "Brand" },
            {
              key: 1,
              header: "Average Price",
              format: (value) => Number((value as number).toFixed(2)),
            },
          ]}
        />
      </div>
    </section>
  );
};

export default StatisticsPage;
