import styles from "./NavigationCom.module.css";
import logoImg from "./../../../assets/Gemini_Generated_Image_8e4vil8e4vil8e4v.png";
import dashImg from "./../../../assets/dashboard.svg";
import dashActImg from "./../../../assets/dashboardActive.svg";
import listImg from "./../../../assets/list.svg";
import listActImg from "./../../../assets/listActive.svg";
import searchIcon from "./../../../assets/search.svg";
import helpHelp from "./../../../assets/help.svg";
import helpActHelp from "./../../../assets/helpActive.svg";

import { useState } from "react";

type NavItem = "dashboard" | "list" | "help";

const NavigationCom = () => {
  const [activeNav, setActiveNav] = useState<NavItem>("dashboard");

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
        <div
          className={`${styles.navItem} ${activeNav === "dashboard" ? styles.navItemActive : ""}`}
          onClick={() => setActiveNav("dashboard")}
        >
          <img src={activeNav === "dashboard" ? dashActImg : dashImg} />
          <span className={styles.underline} />
        </div>
        <div
          className={`${styles.navItem} ${activeNav === "list" ? styles.navItemActive : ""}`}
          onClick={() => setActiveNav("list")}
        >
          <img src={activeNav === "list" ? listActImg : listImg} />
          <span className={styles.underline} />
        </div>

        <div
          className={`${styles.navItem} ${activeNav === "help" ? styles.navItemActive : ""}`}
          onClick={() => setActiveNav("help")}
        >
          <img src={activeNav === "help" ? helpActHelp : helpHelp} />
          <span className={styles.underline} />
        </div>
      </div>
      <div className={styles.settings}></div>
    </div>
  );
};

export default NavigationCom;
