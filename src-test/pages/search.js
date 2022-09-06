import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import StickyBox from "react-sticky-box";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
// import { GetStaticProps } from "next";
import { Router, useRouter } from "next/router";
// import Button from "@components/ui/button";

// import "instantsearch.css/themes/algolia-min.css";
// import "instantsearch.css/themes/reset.css";
import { HitItem } from "@components/instantsearch/hit-item";
import { CustomHits } from "@components/instantsearch/custom-hits";

import {
  InstantSearch,
  InstantSearchSSRProvider,
  RefinementList,
  SearchBox,
  SortBy,
  Configure,
  Pagination,
} from "react-instantsearch-hooks-web";
import { getServerState } from "react-instantsearch-hooks-server";
import { history } from "instantsearch.js/es/lib/routers/index.js";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

// https://www.algolia.com/doc/api-reference/widgets/react-hooks/
const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
  {
    keepZeroFacets: true,
    paginationTotalHits: 5000,
    finitePagination: true,
  }
);

export default function SearchPage({ serverState, url }) {
  const { t } = useTranslation("common");
  // const { query, push, pathname } = useRouter();
  return (
    <>
      <Container>
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <InstantSearchSSRProvider {...serverState}>
            <InstantSearch
              searchClient={searchClient}
              indexName="products"
              routing={{
                router: history({
                  getLocation: () =>
                    typeof window === "undefined"
                      ? new URL(url)
                      : window.location,
                }),
              }}
              // initialUiState={{
              //   products: {
              //     query: "skulls",
              //   },
              // }}
            >
              {/* MORE RESULTS PER PAGE */}
              <Configure hitsPerPage={100} />

              {/* reference 
              <SearchBox
                // Optional props
                placeholder={string}
                queryHook={function}
                onSubmit={function}
                submitIconComponent={() => JSX.Element}
                resetIconComponent={() => JSX.Element}
                loadingIconComponent={() => JSX.Element}
                classNames={object}
                ...props={ComponentProps<'div'>}
              /> */}
              {/* <div className="flex-shrink-0 pe-24 hidden lg:block w-72"> */}
              <div className="left-panel">
                <StickyBox offsetTop={50} offsetBottom={20}>
                  <div className="pb-7">
                    <BreadcrumbItems separator="/">
                      {/* <ActiveLink
                        href={"/"}
                        activeClassName="font-semibold text-heading"
                      >
                        <a>{t("breadcrumb-home")}</a>
                      </ActiveLink> */}
                      {/* <ActiveLink
                        href={ROUTES.SEARCH}
                        activeClassName="font-semibold text-heading"
                      >
                        <a className="capitalize">{t("breadcrumb-search")}</a>
                      </ActiveLink> */}
                    </BreadcrumbItems>
                  </div>
                  {/* <ShopFilters /> */}

                  {/* <h2>Image Types</h2>
                <RefinementList attribute="product_type" /> */}

                  <h2>Status</h2>
                  <RefinementList
                    attribute="status"
                    classNames={{
                      // root: "MyCustomRefinementList",
                      // list: "items-center",
                      // item: "items-center",
                      label: "flex item-center",
                      checkbox:
                        "m-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded",
                      count: "ml-1 item-center",
                      // labelText: "m-1",
                    }}
                  />
                </StickyBox>
              </div>

              <div className="right-panel">
                <SearchBox submitIconComponent={() => <></>} />

                <CustomHits />
                <Pagination
                  // Optional props
                  // totalPages={1000}
                  // padding={number}
                  showFirst={false}
                  // showPrevious={false}
                  // showNext={boolean}
                  showLast={false}
                  // classNames={object}
                  // ...props={ComponentProps<'div'>}
                />
              </div>
            </InstantSearch>
          </InstantSearchSSRProvider>
        </div>
      </Container>
    </>
  );
}

SearchPage.Layout = Layout;

export const getServerSideProps = async ({ req, locale }) => {
  const protocol = req.headers.referer?.split("://")[0] || "https";
  const url = `${protocol}://${req.headers.host}${req.url}`;
  const serverState = await getServerState(<SearchPage url={url} />);

  return {
    props: {
      serverState,
      url,
      ...(await serverSideTranslations(locale, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
