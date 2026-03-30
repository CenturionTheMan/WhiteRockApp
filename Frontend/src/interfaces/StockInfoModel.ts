export default interface StockInfoModel {
	ticker: string;
	subtext: string;
	fromDate: string; // ISO string from API
	toDate: string;
	values: { price: number; date: Date }[];
}

export const getPriceByOrder = (stockInfo: StockInfoModel, index: number) => {
	return stockInfo.values.at(index)?.price;
};

export const getOnlyPrices = (stockInfo: StockInfoModel) => {
	return stockInfo.values.map((v) => v.price);
};
