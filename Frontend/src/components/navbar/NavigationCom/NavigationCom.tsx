import styles from "./NavigationCom.module.css";
import logoImg from "./../../../assets/Gemini_Generated_Image_8e4vil8e4vil8e4v.png";
import dashImg from "./../../../assets/dashboard.svg";
import dashActImg from "./../../../assets/dashboardActive.svg";
import listImg from "./../../../assets/list.svg";
import listActImg from "./../../../assets/listActive.svg";
import searchIcon from "./../../../assets/search.svg";
import helpHelp from "./../../../assets/help.svg";
import helpActHelp from "./../../../assets/helpActive.svg";
import { useLocation, useNavigate, type NavigateFunction } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { toNavLink, type NavLink } from "./../../../interfaces/NavLink";
import { stocksApi } from "../../../api/stocksApi";

const renderSearchBar = (navigate: NavigateFunction, setActiveNav: React.Dispatch<React.SetStateAction<"/" | "/details" | "/help">>) => {
	const searchComRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [allTickers, setAllTicksers] = useState<string[]>([]);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [selectedIdx, setSelectedIdx] = useState<number>(-1);

	useEffect(() => {
		stocksApi.getAll().then((st) => setAllTicksers(st.map((s) => s.ticker)));
	}, []);

	useEffect(() => {
		if (query.trim() === "") {
			setSuggestions([]);
			setSelectedIdx(-1);
			return;
		}
		const fil = allTickers.filter((t) => t.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
		setSuggestions(fil);
		setSelectedIdx(-1);
	}, [query, allTickers]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowDown") {
			setSelectedIdx((i) => Math.min(i + 1, suggestions.length - 1));
		} else if (e.key === "ArrowUp") {
			setSelectedIdx((i) => Math.max(i - 1, -1));
		} else if (e.key === "Enter") {
			const target = selectedIdx >= 0 ? suggestions[selectedIdx] : suggestions[0];
			if (target) navigateToTicker(target);
		} else if (e.key === "Escape") {
			setQuery("");
			setSuggestions([]);
			searchComRef.current?.blur();
		}
	};

	const navigateToTicker = (ticker: string) => {
		setQuery("");
		setSuggestions([]);
		setIsFocused(false);
		setSelectedIdx(-1);
		navigate(`/details?ticker=${ticker}`);
		setActiveNav("/details");
		searchComRef.current?.blur();
	};

	const showDropdown = isFocused && suggestions.length > 0;

	return (
		<div className={styles.searchWrapper}>
			<div className={`${styles.search} ${showDropdown ? styles.searchOpen : ""}`}>
				<img src={searchIcon} style={{ cursor: "pointer" }} onClick={() => suggestions[0] && navigateToTicker(suggestions[selectedIdx] ?? suggestions[0])} />
				<input
					ref={searchComRef}
					placeholder="Search ticker..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setTimeout(() => setIsFocused(false), 150)}
					onKeyDown={handleKeyDown}
				/>
			</div>
			{showDropdown && (
				<div className={styles.dropdown}>
					{suggestions.map((ticker, i) => (
						<div
							key={ticker}
							className={`${styles.dropdownItem} ${i === selectedIdx ? styles.dropdownItemActive : ""}`}
							onMouseDown={() => navigateToTicker(ticker)}
							onMouseEnter={() => setSelectedIdx(i)}
						>
							{ticker}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

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
			{renderSearchBar(navigate, setActiveNav)}
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
