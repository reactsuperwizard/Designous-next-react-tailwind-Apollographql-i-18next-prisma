import { useRef } from "react";
import SearchIcon from "@components/icons/search-icon";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { useActiveScroll } from "@utils/use-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "@components/ui/language-switcher";
import { useAuth } from "@framework/auth/use-auth";
const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const HeaderTwo: React.FC = () => {
  const { openSidebar, setDrawerView, openSearch, openModal, setModalView } =
    useUI();

  const { status } = useAuth();
  const isAuthorized = status === "authenticated";

  const { t } = useTranslation("common");
  const siteHeaderRef = useRef() as DivElementRef;
  useActiveScroll(siteHeaderRef);

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }
  function handleMobileMenu() {
    setDrawerView("MOBILE_MENU");
    return openSidebar();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
    >
      <div className="innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 px-4 lg:pe-6 transition duration-200 ease-in-out">
        <div className="flex items-center mx-auto max-w-[1920px] h-full w-full">
          <button
            aria-label="Menu"
            className="menuBtn hidden md:flex flex-col items-center justify-center pe-5 2xl:pe-7 flex-shrink-0 h-full outline-none focus:outline-none"
            onClick={handleMobileMenu}
          >
            <span className="menuIcon">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          </button>
          <Logo />

          <div className="w-full flex items-center justify-end md:me-5 xl:me-8 2xl:me-10">
            <LanguageSwitcher />
          </div>
          <div className="hidden md:flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0">
            <button
              className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
              onClick={openSearch}
              aria-label="search-button"
            >
              <SearchIcon />
            </button>
            <div className="-mt-0.5 flex-shrink-0">
              <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                className="text-sm xl:text-base text-heading font-semibold"
                btnProps={{
                  className:
                    "text-sm xl:text-base text-heading font-semibold focus:outline-none",
                  children: t("text-sign-in"),
                  onClick: handleLogin,
                }}
              >
                {t("text-account")}
              </AuthMenu>
            </div>
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTwo;