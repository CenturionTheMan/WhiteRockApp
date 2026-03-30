export type SignalCall = "BUY" | "HOLD" | "SELL";

export default interface SignalModel {
	ticker: string;
	date: Date;
	call: SignalCall;
	confidence: number;
}
