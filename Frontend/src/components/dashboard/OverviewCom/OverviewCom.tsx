import styles from "./OverviewCom.module.css";
import CircleBarCom from "./../../common/CircleBarCom/CircleBarCom";
import { useSignalsLatest } from "../../../hooks/useSignals";
import { useMemo } from "react";

const OverviewCom = () => {
  const latestSignals = useSignalsLatest();

  const { signalStrength, buyAmt, sellAmt, holdAmt } = useMemo(() => {
    const signals = latestSignals.data ?? [];

    if (signals.length === 0) {
      return {
        signalStrength: 0,
        buyAmt: 0,
        sellAmt: 0,
        holdAmt: 0,
      };
    }

    let confidenceSum = 0;
    let buy = 0;
    let sell = 0;
    let hold = 0;

    for (const signal of signals) {
      confidenceSum += signal.confidence;

      switch (signal.call) {
        case "BUY":
          buy++;
          break;

        case "SELL":
          sell++;
          break;

        case "HOLD":
          hold++;
          break;
      }
    }

    return {
      signalStrength: Math.round((confidenceSum * 100) / signals.length),
      buyAmt: buy,
      sellAmt: sell,
      holdAmt: hold,
    };
  }, [latestSignals.data]);

  return (
    <div className={`${styles.holder}`}>
      <div className={styles.card1}>
        <div className={`text-style3 text-size3 ${styles.title}`}>GLOBAL MARKET SENTIMENT</div>
        <div className={`${styles.header} text-style1 text-size1`}>Highly Bullish</div>
        <span className={`${styles.comment} text-style4 text-size3`}>
          AI signals indicate a strong momentum across tech indices. <br />
          Momentum score: {buyAmt + sellAmt}/{buyAmt + sellAmt + holdAmt}
        </span>
      </div>
      <div className={styles.card2}>
        <CircleBarCom fillPercent={signalStrength} size={120} strokeWidth={15} />
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
