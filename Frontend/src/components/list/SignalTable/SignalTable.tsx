import type { SignalCall } from "../../../interfaces/SignalModel";
import styles from "./SignalTable.module.css";

export interface TableRowData {
  ticker: string;
  call: SignalCall;
  confidence: number;
  lastPrices: number[];
}

const SignalTable = () => {
  return <></>;
};

export default SignalTable;
