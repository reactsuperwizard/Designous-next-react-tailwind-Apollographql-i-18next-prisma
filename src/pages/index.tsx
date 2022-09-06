// import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
// import BrandGridBlock from "@containers/brand-grid-block";
import CategoryBlock from "@containers/category-block";
import Layout from "@components/layout/layout";
// import BannerWithProducts from "@containers/banner-with-products";
import BannerBlock from "@containers/banner-block";
// import Divider from "@components/ui/divider";
// import DownloadApps from "@components/common/download-apps";
// import Support from "@components/common/support";
// import Instagram from "@components/common/instagram";
// import ProductsFlashSaleBlock from "@containers/product-flash-sale-block";
// import ProductsFeatured from "@containers/products-featured";
// import BannerSliderBlock from "@containers/banner-slider-block";
// import ExclusiveBlock from "@containers/exclusive-block";
import Subscription from "@components/common/subscription";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
// import { homeThreeBanner as banner } from "@framework/static/banner";
import { homeThreeMasonryBanner as masonryBanner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { ROUTES } from "@utils/routes";
import { GetStaticProps } from "next";
import SearchBar from "@components/search-bar/search-bar";
// import ProductsBlock from "@containers/products-block";

export default function Home() {
  return (
    <>
      <SearchBar />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
