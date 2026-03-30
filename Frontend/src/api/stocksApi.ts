import type StockInfoModel from "../interfaces/StockInfoModel";

const BASE_URL = "http://localhost:3000/api"; //TODO SETUP

//? ======================== MOCK DATA ========================
const generatePrices = (days: number, startPrice: number) => {
	const prices: { price: number; date: Date }[] = [];
	let price = startPrice;
	const now = new Date();

	for (let i = days; i >= 0; i--) {
		price += Math.random() * 6 - 3;
		const date = new Date(now);
		date.setDate(date.getDate() - i);
		prices.push({ price: Number(price.toFixed(2)), date });
	}

	return prices;
};
const from = (daysAgo: number) => {
	const d = new Date();
	d.setDate(d.getDate() - daysAgo);
	return d.toISOString();
};
const STOCKS_MOCK: StockInfoModel[] = [
	{ ticker: "AAPL", subtext: "Apple Inc.", fromDate: from(30), toDate: new Date().toISOString(), values: generatePrices(30, 178) },
	{ ticker: "MSFT", subtext: "Microsoft Corporation", fromDate: from(30), toDate: new Date().toISOString(), values: generatePrices(30, 415) },
	{ ticker: "GOOGL", subtext: "Alphabet Inc.", fromDate: from(30), toDate: new Date().toISOString(), values: generatePrices(30, 165) },
	{ ticker: "AMZN", subtext: "Amazon.com Inc.", fromDate: from(30), toDate: new Date().toISOString(), values: generatePrices(30, 192) },
	{ ticker: "TSLA", subtext: "Tesla Inc.", fromDate: from(30), toDate: new Date().toISOString(), values: generatePrices(30, 245) },
	{ ticker: "NVDA", subtext: "NVIDIA Corporation", fromDate: from(30), toDate: new Date().toISOString(), values: generatePrices(30, 875) },
	{ ticker: "META", subtext: "Meta Platforms Inc.", fromDate: from(30), toDate: new Date().toISOString(), values: generatePrices(30, 505) },
	{ ticker: "NFLX", subtext: "Netflix Inc.", fromDate: from(30), toDate: new Date().toISOString(), values: generatePrices(30, 635) },
	{ ticker: "AMD", subtext: "Advanced Micro Devices", fromDate: from(30), toDate: new Date().toISOString(), values: generatePrices(30, 165) },
	{ ticker: "INTC", subtext: "Intel Corporation", fromDate: from(30), toDate: new Date().toISOString(), values: generatePrices(30, 43) },
];
//? ======================== MOCK DATA ========================

export const stocksApi = {
	//TODO IMPLEMENT
	getAll: async (): Promise<StockInfoModel[]> => {
		return STOCKS_MOCK; //TODO REMOVE!
		const res = await fetch(`${BASE_URL}/stocks`);
		if (!res.ok) throw new Error("Failed to fetch stocks");
		return res.json();
	},

	//TODO IMPLEMENT
	getByTicker: async (ticker: string): Promise<StockInfoModel> => {
		const stock = STOCKS_MOCK.find((s) => s.ticker == ticker); //TODO REMOVE!
		if (!stock) throw new Error(`Stock with ticker ${ticker} not found`);
		return stock;

		const res = await fetch(`${BASE_URL}/stocks/${ticker}`);
		if (!res.ok) throw new Error("Failed to fetch stocks");
		return res.json();
	},

	//TODO IMPLEMENT
	getByPeriod: async (from: string, to: string): Promise<StockInfoModel[]> => {
		return STOCKS_MOCK.map((s) => ({
			//TODO REMOVE!
			...s,
			values: s.values.filter((v) => v.date.toISOString() >= from && v.date.toISOString() <= to),
		}));

		const res = await fetch(`${BASE_URL}/stocks?from=${from}&to=${to}`); // 👈 already strings, no .toISOString()
		if (!res.ok) throw new Error("Failed to fetch stocks");
		return res.json();
	},

	//TODO IMPLEMENT
	getByTickerAndPeriod: async (ticker: string, fromIso: string, toIso: string): Promise<StockInfoModel> => {
		const stock = STOCKS_MOCK.find((s) => s.ticker === ticker); //TODO REMOVE!
		if (!stock) throw new Error(`Stock with ticker ${ticker} not found`);
		return {
			...stock,
			values: stock.values.filter((v) => v.date.toISOString() >= fromIso && v.date.toISOString() <= toIso),
		};

		const res = await fetch(`${BASE_URL}/stocks/${ticker}?from=${fromIso}&to=${toIso}`);
		if (!res.ok) throw new Error("Failed to fetch stocks");
		return res.json();
	},
};
