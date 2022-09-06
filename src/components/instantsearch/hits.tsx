import { useList } from "react-use";
import { FC, useMemo } from "react";
import { HitItem } from "./hit-item";
import Spinner from "@components/common/spinner";
import { ProductSearchResult } from "@framework/types";

const EmptyState: FC = () => {
  return (
    <div className="relative flex justify-center px-12 py-32">
      <Spinner />
    </div>
  );
};

interface ProductMasonryProps {
  products?: ProductSearchResult[];
}

export const Hits: FC<ProductMasonryProps> = ({ products }) => {
  const [loaded, { push: pushLoaded }] = useList<string>();

  console.log("######################", products);
  const busy = useMemo(() => {
    if (!products) {
      return true;
    }

    let count = 0;
    let existing = 0;
    products.forEach((product) => {
      count += 1;
      if (loaded.includes(product.thumbnail)) {
        existing += 1;
      }
    });

    return existing !== count;
  }, [products, loaded]);

  // if (!products) {
  //   return <EmptyState />;
  // }

  return (
    <>
      {/* {busy && <EmptyState />} */}

      <div className="mb-4 masonry-box">
        {products &&
          products.map((product) => (
            <HitItem
              key={product.id}
              product={product}
              hidden={busy}
              onLoad={() => {
                const thumb = product.thumbnail;
                if (!loaded.includes(thumb)) {
                  pushLoaded(thumb);
                }
              }}
            />
          ))}

        {products && products.length === 0 && (
          <div className="w-full p-4 text-center">No results found...</div>
        )}
      </div>
    </>
  );
};
