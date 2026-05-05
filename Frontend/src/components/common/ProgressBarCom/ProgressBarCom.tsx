import { useEffect, useState } from "react";
import styles from "./ProgressBarCom.module.css";

const ProgressBarCom = ({
  value,
  backgroundColor = "var(--col-bg3)",
  fillColor = "var(--col-primary1)",
}: {
  value: number;
  backgroundColor?: string;
  fillColor?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);
  return (
    <div className={styles.holder}>
      <div className={styles.fillHolder} style={{ backgroundColor }}>
        <div
          className={styles.fill}
          style={{
            width: `${displayValue}%`,
            backgroundColor: fillColor,
          }}
        />
      </div>
      <span className={styles.text}>{Math.round(value)}%</span>
    </div>
  );
};

export default ProgressBarCom;
