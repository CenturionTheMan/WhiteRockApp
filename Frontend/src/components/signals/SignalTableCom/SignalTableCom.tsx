import type { SignalCall } from "../../../interfaces/SignalModel";
import styles from "./SignalTableCom.module.css";
import sortIcon from "./../../../assets/sort.svg";
import sortActIcon from "./../../../assets/sortActive.svg";
import filterIcon from "./../../../assets/filter.svg";
import filterActIcon from "./../../../assets/filterActive.svg";
import { useEffect, useMemo, useRef, useState } from "react";
import SimpleChart from "../../common/SimpleChart/SimpleChart";
import ProgressBarCom from "../../common/ProgressBarCom/ProgressBarCom";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import SignalInfoCom from "../../common/SignalInfoCom/SignalInfoCom";
import { useStockByPeriod } from "../../../hooks/useStocks";
import { useSignalsLatest } from "../../../hooks/useSignals";
import {
  getOnlyPrices,
  getPriceByOrder,
} from "../../../interfaces/StockInfoModel";

export interface TableRowData {
  ticker: string;
  call?: SignalCall;
  confidence: number;
  lastPrices: number[];
}

const CalcPriceChangeStr = (prices: number[]) => {
  const diff = CalcPriceChange(prices);
  return diff >= 0 ? `+${diff.toFixed(2)}%` : `${diff.toFixed(2)}%`;
};

const CalcPriceChange = (prices: number[]) => {
  const diff = (prices[prices.length - 1] ?? 0) - (prices[0] ?? 0);
  return diff;
};

const GetStyleColor = (val: number) => {
  if (val > 0)
    return "#75ff9e"; // --col-primary1
  else if (val < 0)
    return "#ffb4ab"; // --col-negative1
  else return "#ffdf9e"; // --col-neutral1
};

const GetConfidenceColor = (confidence: number, alpha = 1) => {
  if (confidence >= 0.8)
    return `rgba(117, 255, 158, ${alpha})`; // --col-primary1
  else if (confidence <= 0.6)
    return `rgba(255, 180, 171, ${alpha})`; // --col-negative1
  else return `rgba(255, 223, 158, ${alpha})`; // --col-neutral1
};

const getTickerFromUrl = (location: Location) => {
  const queryParams = new URLSearchParams(location.search);
  const ticker = queryParams.get("ticker") ?? "";
  return ticker;
};

const SignalTableCom = ({
  fnOnSelected,
}: {
  fnOnSelected: (ticker: string) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d;
  }, []);
  const to = useMemo(() => new Date(), []);

  const stocksFetch = useStockByPeriod(from, to);
  const signalsFetch = useSignalsLatest();

  const selectedRow = getTickerFromUrl(location);

  const rows = useMemo<TableRowData[]>(() => {
    if (!stocksFetch.data || !signalsFetch.data) return [];

    return stocksFetch.data.map((stock) => {
      const signal = signalsFetch.data?.find((s) => s.ticker === stock.ticker);
      return {
        ticker: stock.ticker,
        call: signal?.call,
        confidence: signal?.confidence ?? 0,
        lastPrices: getOnlyPrices(stock),
      };
    });
  }, [stocksFetch.data, signalsFetch.data]);

  const handleRowSelected = (ticker: string) => {
    navigate(`${location.pathname}?ticker=${ticker}`);
    fnOnSelected(ticker);
  };

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filterBtn}>
          <img src={filterIcon} />
          <span className="text-size4 text-style3">Filter</span>
        </div>
        <div className={styles.filterBtn}>
          <img src={sortIcon} />
          <span className="text-size4 text-style3">Sort</span>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ASSET</th>
              <th>LAST PRICE</th>
              <th>24H CHANGE</th>
              <th>AI SIGNAL</th>
              <th>CONFIDENCE</th>
              <th>MOMENTUM</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr
                key={r.ticker}
                className={`${r.ticker === selectedRow ? styles.selectedRow : ""}`}
                onClick={() => handleRowSelected(r.ticker)}
              >
                <td className="text-style2 text-size3">{r.ticker}</td>
                <td className="text-style3 text-size3">{`$${r.lastPrices.at(-1) ?? "??"}`}</td>
                <td
                  className="text-style3 text-size3"
                  style={{
                    color: GetStyleColor(CalcPriceChange(r.lastPrices)),
                  }}
                >
                  {CalcPriceChangeStr(r.lastPrices)}
                </td>
                <td>
                  <SignalInfoCom signalCall={r.call ?? "NONE"} width={"50%"} />
                </td>
                <td>
                  <ProgressBarCom
                    value={r.confidence * 100}
                    fillColor={GetConfidenceColor(r.confidence)}
                  />
                </td>
                <td>
                  <SimpleChart
                    data={r.lastPrices}
                    dot={false}
                    type="bump"
                    color={GetStyleColor(CalcPriceChange(r.lastPrices))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SignalTableCom;
