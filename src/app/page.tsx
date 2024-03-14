import Image from "next/image";
import { Button, ErrorMessage, Text } from "@/components/atoms";
import { ProductCard } from "@/components/molecules";
import { Filters } from "@/components/organisms";
import { Product, SearchParams } from "@/types";
import { API_URL, DEFAULT_PAGE } from "@/lib/constants";
import Link from "next/link";

type HomePageProps = {
  searchParams: SearchParams;
};

const HomePage: React.FC<HomePageProps> = async ({ searchParams }) => {
  let status = "loading";
  let products = [];
  let priceRange = { min: 0, max: 0 };
  let sizes;
  let total = 0;
  let error = null;

  const page = parseInt(searchParams.page || DEFAULT_PAGE, 10);
  const size = searchParams.size || "";
  const sortOrder = searchParams.sortOrder || "";
  const minPrice = searchParams.minPrice || "";
  const maxPrice = searchParams.maxPrice || "";

  const params = new URLSearchParams({
    page: page.toString(),
    ...(size && { size }),
    ...(sortOrder && { sortOrder }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
  });

  try {
    const response = await fetch(`${API_URL}/api/products?${params}`);
    const data = await response.json();
    status = "success";
    products = data?.products;
    priceRange = data?.priceRange;
    sizes = data?.sizes;
    total = data?.total;
  } catch (err) {
    status = "failed";
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "An unknown error occurred";
    }
  }

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <ErrorMessage message="No products found" className="text-xl" />
        ) : (
          products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      <div className="w-full mt-4 pt-4 text-center">
        {products?.length === total ? null : (
          <Link
            href={`
              ?${new URLSearchParams({
                page: (page + 1).toString(),
                size,
                sortOrder,
                minPrice,
                maxPrice,
              }).toString()}
            `}
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
