import React from "react";
import Skeleton from "react-loading-skeleton";
import { Text } from "@/components/atoms";
import { Filters } from "@/components/organisms";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

const Loading: React.FC = () => {
  return (
    <section>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Products <Text variant="span">8 of 48</Text>
        </h1>
        <Filters />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: Number(DEFAULT_PAGE_SIZE) }).map((_, index) => (
          <div
            key={`loading-${index}`}
            className="flex flex-col border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out h-96"
          >
            <Skeleton
              containerClassName="flex-1 self-center"
              width={200}
              height={250}
            />
            <Text
              variant="h2"
              className="mt-4 text-xl text-center font-bold line-clamp-2"
            >
              <Skeleton />
            </Text>
            <Text
              variant="p"
              className="mt-2 text-sm text-center text-gray-600"
            >
              <Skeleton count={2} />
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Loading;
