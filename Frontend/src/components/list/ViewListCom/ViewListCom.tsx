import styles from "./ViewListCom.module.css";
import sortIcon from "./../../../assets/sort.svg";
import sortActIcon from "./../../../assets/sortActive.svg";
import filterIcon from "./../../../assets/filter.svg";
import filterActIcon from "./../../../assets/filterActive.svg";
import SignalTable from "../SignalTable/SignalTable";

const ViewListCom = () => {
  return (
    <div className={styles.container}>
      <span className="text-size2 text-style2">WhiteRock Next Gen AI</span>
      <span className="text-size4 text-style4">
        Real-time AI analysis of global assets. Signals are updated every hour.
      </span>
      <div className={styles.filters}>
        <div className={styles.filterBtn}>
          <img src={filterIcon} />
          <span className="text-size4 text-style3">Filter</span>
        </div>
        <div className={styles.filterBtn}>
          <img src={sortIcon} />
          <span className="text-size4 text-style3">Sort</span>
        </div>
        <SignalTable />
      </div>
    </div>
  );
};

export default ViewListCom;
