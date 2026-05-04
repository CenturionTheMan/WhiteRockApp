export type SignalCall = "BUY" | "HOLD" | "SELL";

export default interface SignalModel {
  ticker: string;
  timestamp: string;
  call: SignalCall;
  confidence: number;
}
