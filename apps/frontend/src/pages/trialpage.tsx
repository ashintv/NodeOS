import { useState } from "react";

export function TrialPage() {
	const [vari, setVar] = useState();
	const evtSource = new EventSource("http://localhost:3000/api/v1/webhook/webhook/handler/68cd8c45003adc08ce1eeab1");

	evtSource.onmessage = (event) => {
		const msg = JSON.parse(event.data);
		console.log("Received:", msg);
		setVar(event.data);
	};

	evtSource.addEventListener("end", (event) => {
		console.log("Stream ended:", event.data);
		evtSource.close();
	});
	return <div className="w-screen h-screen flex justify-center items-center text-white">{"recievd   "+vari}</div>;
}
