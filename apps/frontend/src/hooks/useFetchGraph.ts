import { BASE_URL } from "@/config";
import { useCurrentGraphStateStore } from "@/store/state-store";
import type { Edge, Node } from "@xyflow/react";
import axios from "axios";
import { useEffect, useState } from "react";

export function useGraphs() {
	const id = useCurrentGraphStateStore((state) => state.CurrentId);
	const [initialNodes, setInitialNodes] = useState<Node[]>([]);
	const [initialEdges, setInitalEdges] = useState<Edge[]>([]);
    const [isLoaded  , setIsloaded ]= useState(false)
	
	async function fetchData() {    
		try {
			const res = await axios.get(`${BASE_URL}/workflow/${id}`, {
				headers: {
					token: localStorage.getItem("token"),
				},
			});
			setInitialNodes(res.data.workflow.nodes);
			setInitalEdges(res.data.workflow.connections);
		} catch (e) {
			console.log(e);
		}
        finally{
            setIsloaded(true)
        }
	}

	useEffect(() => {
		fetchData();
	}, [id]);

	return {
		initialEdges,
		initialNodes,
		isLoaded,
	};
}
