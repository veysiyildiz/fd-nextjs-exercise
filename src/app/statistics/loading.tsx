import React from "react";
import Skeleton from "react-loading-skeleton";
import { Text } from "@/components/atoms";

const Loading = () => {
  return (
    <section className="p-6">
      <Text variant="h1" className="text-4xl mb-6">
        Statistics
      </Text>
      <div className="mb-8">
        <Text variant="h2" className="mb-4 text-2xl">
          Brands with product count under 40
        </Text>
        <table className="w-full table-auto border border-collapse">
          <thead>
            <tr>
              <th className="w-1/2 px-4 py-2 border">
                <Skeleton height={40} />
              </th>
              <th className="w-1/2 px-4 py-2 border">
                <Skeleton height={40} />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td className="px-4 py-2 border">
                  <Skeleton height={40} />
                </td>
                <td className="px-4 py-2 border">
                  <Skeleton height={40} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-8">
        <Text variant="h2" className="mb-4 text-2xl">
          Brands with average price for size 32
        </Text>
        <table className="w-full table-auto border border-collapse">
          <thead>
            <tr>
              <th className="w-1/2 px-4 py-2 border">
                <Skeleton height={40} />
              </th>
              <th className="w-1/2 px-4 py-2 border">
                <Skeleton height={40} />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td className="px-4 py-2 border">
                  <Skeleton height={40} />
                </td>
                <td className="px-4 py-2 border">
                  <Skeleton height={40} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

Loading.displayName = "Loading";

export default Loading;
