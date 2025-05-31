import { BookOutlined, BranchesOutlined, CodeOutlined, HomeOutlined,MessageOutlined,ReadOutlined, ScheduleOutlined, TagOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const createNavItem = (key, to, icon, label, collapsed) => ({
  key,
  icon: (
    <NavLink to={to}>
      {typeof icon === "string" ? (
        <img src={`${process.env.PUBLIC_URL}/images/icon/${icon}`} alt="icon" className="nav__icon" />
      ) : (
        icon
      )}
    </NavLink>
  ),
  label: !collapsed && (
    <NavLink
      className={({ isActive, isPending }) =>
        `nav__link ${isPending ? "pending" : isActive ? "active" : ""}`
      }
      to={to}
    >
      {label}
    </NavLink>
  ),
});

export const routeConfig = (collapsed) => [
  createNavItem("1", "/home", <HomeOutlined className="nav__icon"  style={{fontSize : '20px'}}/>, "Trang chủ", collapsed),
  createNavItem("2", "/study-plan",  <BranchesOutlined className="nav__icon"  style={{fontSize : '20px'}}/>, "Kế hoạch", collapsed),
  createNavItem("8", "/trello", <ScheduleOutlined className="nav__icon" style={{fontSize : '20px'}} />, "Trello Codelab", collapsed),
  createNavItem("3", "/flashcard", <BookOutlined className="nav__icon"  style={{fontSize : '20px'}}/>, "FlashCard", collapsed),
  createNavItem("4", "/blog",<ReadOutlined className="nav__icon"  style={{fontSize : '20px'}}/>, "Bài viết", collapsed),
  createNavItem("5", "/link",<TagOutlined className="nav__icon"  style={{fontSize : '20px'}}/>, "Bài viết", collapsed),
  createNavItem("6", "/chat",<MessageOutlined className="nav__icon"  style={{fontSize : '20px'}}/>, "Hội thoại", collapsed),
  createNavItem(
    "7",
    "https://tuananhdeptrai16.github.io/editor/",
   <CodeOutlined className="nav__icon"  style={{fontSize : '20px'}}/>,
    "LabCode",
    collapsed
  ),
];
