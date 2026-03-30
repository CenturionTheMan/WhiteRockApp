export type SignalCall = "BUY" | "HOLD" | "SELL";

export default interface SignalModel {
	ticker: string;
	date: string;
	call: SignalCall;
	confidence: number;
}
