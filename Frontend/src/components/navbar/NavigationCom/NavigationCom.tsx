import styles from "./NavigationCom.module.css";
import logoImg from "./../../../assets/Gemini_Generated_Image_8e4vil8e4vil8e4v.png";
import dashImg from "./../../../assets/dashboard.svg";
import dashActImg from "./../../../assets/dashboardActive.svg";
import listImg from "./../../../assets/list.svg";
import listActImg from "./../../../assets/listActive.svg";
import searchIcon from "./../../../assets/search.svg";
import helpHelp from "./../../../assets/help.svg";
import helpActHelp from "./../../../assets/helpActive.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toNavLink, type NavLink } from "./../../../interfaces/NavLink";

const NavigationCom = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activeNav, setActiveNav] = useState<NavLink>(toNavLink(location.pathname) ?? "/");

	const handleViewChange = (link: NavLink) => {
		setActiveNav(link);
		navigate(link);
	};

	return (
		<div className={styles.holder}>
			<div className={styles.logo}>
				<img src={logoImg} />
			</div>
			<div className={styles.search}>
				<img src={searchIcon} />
				<input placeholder="Search..."></input>
			</div>
			<div className={styles.nav}>
				<div className={`${styles.navItem} ${activeNav === "/" ? styles.navItemActive : ""}`} onClick={() => handleViewChange("/")}>
					<img src={activeNav === "/" ? dashActImg : dashImg} />
					<span className={styles.underline} />
				</div>
				<div className={`${styles.navItem} ${activeNav === "/details" ? styles.navItemActive : ""}`} onClick={() => handleViewChange("/details")}>
					<img src={activeNav === "/details" ? listActImg : listImg} />
					<span className={styles.underline} />
				</div>

				<div className={`${styles.navItem} ${activeNav === "/help" ? styles.navItemActive : ""}`} onClick={() => handleViewChange("/help")}>
					<img src={activeNav === "/help" ? helpActHelp : helpHelp} />
					<span className={styles.underline} />
				</div>
			</div>
			<div className={styles.settings}></div>
		</div>
	);
};

export default NavigationCom;
