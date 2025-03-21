import { useRouter } from "next/router";
import { MdShoppingCart, MdSearch, MdPerson } from "react-icons/md";
import Avatar from "@/components/ui/Avatar";

import {
  Wrapper,
  Container,
  Navbar,
  ActionButtonGroup,
  SearchButton,
  CartButton,
  TriggerButton,
  Logo,
  NavLink,
  NavLinks,
  ButtonText,
  HamburgerMenuButton,
  HamburgerSvg,
  Overlay,
  LogoWrapperMobile,
  DropdownContainer,
  DropdownWrapper,
  DropdownList,
  DropdownItem,
  DropdownItemButton,
  DropdownItemLink,
} from "./styled";
import { useState } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { breakpoints } from "@/styles/container";
import { ImageLink as LogoWrapperDesktop } from "@/components/ui/images";
import { isValid } from "@/helpers/api/status";
import { HeaderProps } from "./data";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useToast } from "@/components/ui/Toast";
import { layoutPath } from "@/constants/imagePath";

const Header = ({ isAuthenticated, isLoading }: HeaderProps) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isTablet = useBreakpoint(breakpoints.md);
  const [isDropdownToggled, setIsDropdownToggled] = useState(false);
  const { openToast, Toast } = useToast();

  const triggerButtonRef = useOutsideClick(
    () => setIsDropdownToggled(false),
    true,
  );

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  const toggleAccountMenu = () => {
    setIsDropdownToggled((prev) => !prev);
  };

  const handleSignin = () => {
    const path = router.pathname;
    if (path === "/auth/signin") return;
    router.push("/auth/signin");
  };

  const handleLogout = async () => {
    const res = await fetch("/api/auth/signout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (isValid(result)) {
      openToast("登出成功", "success");
      window.location.href = "/";
    } else {
      openToast(`登出失敗: ${result.message}`, "error");
    }
  };

  const dropdownItems = [
    {
      label: "我的帳戶",
      href: "/user/profile",
    },
    {
      label: "訂單管理",
      href: "/user/order",
    },
    {
      label: "登出",
      onClick: handleLogout,
    },
  ];

  return (
    <Wrapper>
      <Container>
        <HamburgerMenuButton onClick={toggleMenu}>
          <HamburgerSvg $menuOpen={menuOpen}>
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              className="top"
              shapeRendering="crispEdges"
            />
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              className="middle"
              shapeRendering="crispEdges"
            />
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              className="bottom"
              shapeRendering="crispEdges"
            />
          </HamburgerSvg>
        </HamburgerMenuButton>
        {menuOpen && <Overlay onClick={toggleMenu} $menuOpen={menuOpen} />}
        {/* <LogoWrapperMobile>
          <Logo
            src="/images/logo.png"
            alt="輔具租賃網"
            width={40}
            height={40}
          />
        </LogoWrapperMobile> */}
        <Navbar $menuOpen={menuOpen}>
          {isTablet && (
            <LogoWrapperDesktop href="/" passHref>
              {/* <Image
                src={`${layoutPath}/logo-desktop.webp`}
                alt="輔具租賃網"
                width={40}
                height={40}
                priority
              /> */}
              <Logo
                src={`${layoutPath}/logo-desktop.webp`}
                alt="輔具租賃網"
                width={40}
                height={40}
              />
            </LogoWrapperDesktop>
          )}
          <NavLinks>
            {!isTablet && (
              <NavLink
                href="/"
                $active={router.pathname === "/"}
                onClick={handleNavLinkClick}
              >
                首頁
              </NavLink>
            )}
            <NavLink
              href="/product"
              $active={router.pathname === "/product"}
              onClick={handleNavLinkClick}
            >
              所有輔具
            </NavLink>
            <NavLink
              href="/faq"
              onClick={handleNavLinkClick}
              $active={router.pathname === "/faq"}
            >
              常見問題
            </NavLink>
            <NavLink
              href="/inquiry"
              $active={router.pathname === "/inquiry"}
              onClick={handleNavLinkClick}
            >
              詢問單
            </NavLink>
          </NavLinks>
        </Navbar>

        <ActionButtonGroup>
          <SearchButton>
            <MdSearch size={24} />
            <ButtonText>快速適配</ButtonText>
          </SearchButton>
          <CartButton href="/cart">
            <MdShoppingCart size={24} />
            <ButtonText>購物車</ButtonText>
          </CartButton>
          <DropdownWrapper>
            {isAuthenticated ? (
              <TriggerButton
                ref={triggerButtonRef}
                onClick={toggleAccountMenu}
                $padding="14px 25px"
              >
                {!isLoading && <Avatar />}
                <ButtonText>我的帳戶</ButtonText>
              </TriggerButton>
            ) : (
              <TriggerButton
                ref={triggerButtonRef}
                onClick={handleSignin}
                $padding="14px 41px"
              >
                <MdPerson size={24} />
                <ButtonText>登入</ButtonText>
              </TriggerButton>
            )}
            <DropdownContainer $isOpen={isDropdownToggled}>
              <DropdownList>
                {dropdownItems.map((item) => (
                  <DropdownItem
                    key={item.label}
                    $active={item.href ? router.pathname === item.href : false}
                  >
                    {item.href ? (
                      <DropdownItemLink href={item.href}>
                        {item.label}
                      </DropdownItemLink>
                    ) : (
                      <DropdownItemButton onClick={item.onClick}>
                        {item.label}
                      </DropdownItemButton>
                    )}
                  </DropdownItem>
                ))}
              </DropdownList>
            </DropdownContainer>
          </DropdownWrapper>
        </ActionButtonGroup>
      </Container>
      <Toast />
    </Wrapper>
  );
};
export default Header;
