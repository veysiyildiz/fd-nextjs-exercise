import Image from "next/image";
import Link from "next/link";
import { Button, ErrorMessage, Text } from "@/components/atoms";
import { ProductCard } from "@/components/molecules";
import { Filters } from "@/components/organisms";
import { Product, SearchParams } from "@/types";
import { API_URL, DEFAULT_PAGE } from "@/lib/constants";
import { fetchProducts } from "@/lib/utils";
import { Product } from "@/types";

type HomePageProps = {
  searchParams: SearchParams;
};

const ProductList = ({ products, total }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {products.length === 0 ? (
      <ErrorMessage message="No products found" className="text-xl" />
    ) : (
      products?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))
    )}
  </div>
);

const HomePage: React.FC<HomePageProps> = async ({ searchParams }) => {
  const page = parseInt(searchParams.page || DEFAULT_PAGE, 10);
  const size = searchParams.size || "";
  const sortOrder = searchParams.sortOrder || "";
  const minPrice = searchParams.minPrice || "";
  const maxPrice = searchParams.maxPrice || "";

  const createURLParams = (page, size, sortOrder, minPrice, maxPrice) => {
    return new URLSearchParams({
      page: (page + 1).toString(),
      size,
      sortOrder,
      minPrice,
      maxPrice,
    }).toString();
  };

  const params = new URLSearchParams({
    page: page.toString(),
    ...(size && { size }),
    ...(sortOrder && { sortOrder }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
  });

  const response = await fetchProducts(params);

  if (response.status !== "success") {
    return (
      <ErrorMessage
        message={`HTTP error! status: ${response.status}`}
        className="text-xl"
      />
    );
  } else {
    try {
      const data = await response.json();
    } catch (error) {
      console.error("This is not JSON:", error);
    }
  }

  const { status, data, error } = response;
  const { products, sizes, priceRange, total } = data;

  if (status === "failed") {
    return (
      <ErrorMessage
        message={error || "An unknown error occurred"}
        className="text-xl"
      />
    );
  }

  return (
    <section>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Products{" "}
          <Text variant="span">
            {products?.length} of {total}
          </Text>
        </h1>
        <Filters
          sizes={sizes}
          priceRange={priceRange}
          searchParams={searchParams}
        />
      </div>
      <ProductList products={products} total={total} />
      <div className="w-full mt-4 pt-4 text-center">
        {products?.length === total ? null : (
          <Link
            href={`?${createURLParams(
              page,
              size,
              sortOrder,
              minPrice,
              maxPrice
            )}`}
            scroll={false}
          >
            <Button variant="primary">Load More</Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default HomePage;
