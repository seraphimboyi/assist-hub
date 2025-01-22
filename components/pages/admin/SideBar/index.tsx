import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdPerson,
  MdSettings,
  MdNotifications,
  MdSearch,
  MdQuestionAnswer,
  MdShoppingCart,
  MdPeople,
  MdBarChart,
} from "react-icons/md";
import {
  SidebarContainer,
  Logo,
  LogoText,
  TopSection,
  IconGroup,
  IconWrapper,
  NotificationBadge,
  SearchContainer,
  SearchInput,
  SearchIcon,
  NavList,
  NavItem,
  NavLink,
} from "./styled";

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <SidebarContainer>
      <TopSection>
        <Link href="/">
          <Logo>
            <Image
              src="/images/LOGO-default.webp"
              alt="RENT4U Logo"
              width={40}
              height={40}
              quality={100}
              priority
            />
            <LogoText>RENT4U 後台</LogoText>
          </Logo>
        </Link>

        <IconGroup>
          <IconWrapper>
            <MdPerson size={24} />
          </IconWrapper>
          <IconWrapper>
            <MdSettings size={24} />
          </IconWrapper>
          <IconWrapper>
            <MdNotifications size={24} />
            <NotificationBadge>9</NotificationBadge>
          </IconWrapper>
        </IconGroup>
      </TopSection>

      <SearchContainer>
        <SearchIcon>
          <MdSearch size={20} />
        </SearchIcon>
        <SearchInput placeholder="找尋..." />
      </SearchContainer>

      <NavList>
        <NavItem>
          <NavLink
            href="/admin/inquiry"
            active={(router.asPath === "/admin/inquiry").toString()}
          >
            <MdQuestionAnswer size={20} />
            詢問列表
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/admin/order"
            active={(router.asPath === "/admin/order").toString()}
          >
            <MdShoppingCart size={20} />
            訂單列表
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/admin/user"
            active={(router.asPath === "/admin/user").toString()}
          >
            <MdPeople size={20} />
            用戶資料
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/admin/statistic"
            active={(router.asPath === "/admin/statistic").toString()}
          >
            <MdBarChart size={20} />
            數據報表
          </NavLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
