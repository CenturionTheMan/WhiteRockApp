import type { SignalCall } from "../../../interfaces/SignalModel";
import styles from "./SignalInfoCom.module.css";

const GetCallColor = (call: SignalCall, alpha = 1) => {
	if (call == "BUY")
		return `rgba(117, 255, 158, ${alpha})`; // --col-primary1
	else if (call == "SELL")
		return `rgba(255, 180, 171, ${alpha})`; // --col-negative1
	else return `rgba(255, 223, 158, ${alpha})`; // --col-neutral1
};

type SignalInfoWidth = number | `${number}%`;

const SignalInfoCom = ({ signalCall, width = "100%" }: { signalCall: SignalCall | "NONE"; width?: SignalInfoWidth }) => {
	return (
		<div
			style={{
				color: signalCall == "NONE" ? "#000000" : GetCallColor(signalCall, 1),
				backgroundColor: signalCall == "NONE" ? "#000000" : GetCallColor(signalCall, 0.1),
				borderStyle: "solid",
				borderWidth: "1px",
				width: width,
			}}
			className={`text-style2 text-size4 ${styles.signalCall}`}
		>
			{signalCall}
		</div>
	);
};

export default SignalInfoCom;
