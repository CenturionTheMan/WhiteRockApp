import styles from "./SignalsCom.module.css";

import SignalTable from "../SignalTableCom/SignalTableCom";
import StockDetails from "../StockDetailsCom/StockDetailsCom";
import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const getTickerFromUrl = (search: string) => {
  const queryParams = new URLSearchParams(search);
  return queryParams.get("ticker") ?? "";
};

const SignalsCom = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const stockDetailsRef = useRef<HTMLDivElement>(null);

  const selected = getTickerFromUrl(location.search);

  const handleOnSelected = useCallback((_ticker: string) => {}, []);

  const prevSelected = useRef<string>("");

  useEffect(() => {
    if (!selected) return;

    // Don't scroll if this is just a data refresh for the same ticker
    if (prevSelected.current === selected) return;
    prevSelected.current = selected;

    // Scroll only after the element has real height (data loaded + painted)
    const tryScroll = (attemptsLeft: number) => {
      const el = stockDetailsRef.current;
      // Wait until element has meaningful height (not just .show with empty content)
      if (el && el.offsetHeight > 100) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attemptsLeft > 0) {
        setTimeout(() => tryScroll(attemptsLeft - 1), 80);
      }
    };

    tryScroll(15);
  }, [selected]);

  return (
    <div className={styles.container}>
      <span className="text-size2 text-style2">WhiteRock Next Gen AI</span>

      <span className="text-size4 text-style4">
        Real-time AI analysis of global assets. Signals are updated every hour.
      </span>

      <SignalTable fnOnSelected={handleOnSelected} />

      <div
        ref={stockDetailsRef}
        className={`${styles.stockDetailsHolder} ${
          selected ? styles.show : ""
        }`}
      >
        <StockDetails ticker={selected} />
      </div>
    </div>
  );
};

export default SignalsCom;
