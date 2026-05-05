import styles from "./OverviewCom.module.css";
import CircleBarCom from "./../../common/CircleBarCom/CircleBarCom";
import { useSignalsLatest } from "../../../hooks/useSignals";
import { useEffect, useState } from "react";

const OverviewCom = () => {
  const latestSignals = useSignalsLatest();
  const [signalStrength, setSignalStrength] = useState<number>(0);
  const [buyAmt, setBuyAmt] = useState<number>(0);
  const [sellAmt, setSellAmt] = useState<number>(0);
  const [holdAmt, setHoldAmt] = useState<number>(0);

  useEffect(() => {
    if (!latestSignals.data?.length) return;

    const avg =
      latestSignals.data.reduce((acc, s) => acc + s.confidence, 0) /
      latestSignals.data.length;
    setSignalStrength(Math.round(avg));

    setBuyAmt(latestSignals.data.filter((c) => c.call === "BUY").length);
    setSellAmt(latestSignals.data.filter((c) => c.call === "SELL").length);
    setHoldAmt(latestSignals.data.filter((c) => c.call === "HOLD").length);
  }, [latestSignals.data]);

  console.log(latestSignals);

  return (
    <div className={`${styles.holder}`}>
      <div className={styles.card1}>
        <div className={`text-style3 text-size3 ${styles.title}`}>
          GLOBAL MARKET SENTIMENT
        </div>
        <div className={`${styles.header} text-style1 text-size1`}>
          Highly Bullish
        </div>
        <span className={`${styles.comment} text-style4 text-size3`}>
          AI signals indicate a strong momentum across tech indices. <br />
          Momentum score: {buyAmt + sellAmt}/{buyAmt + sellAmt + holdAmt}
        </span>
      </div>
      <div className={styles.card2}>
        <CircleBarCom
          fillPercent={signalStrength}
          size={120}
          strokeWidth={15}
        />
        <div className={`flex-row-center ${styles.signal_stre_text}`}>
          <div className={styles.dot} />
          <span
            className={`text-style3 text-size3`}
            style={{
              textAlign: "center",
            }}
          >
            Overall confidence
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCom;
