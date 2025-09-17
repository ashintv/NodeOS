import { Tool } from "@repo/definitions/types";
import axios from "axios";

export function getToolfunction(data: Tool):any {
	if (data.type == "callApi") {
		return async function (){
			try {
				const res = await axios.get(data.url!);
				return res.data;
			} catch (error) {
				return {
					message: "Error",
					error,
				};
			}
		};
	}
}


export function getToolschema(t:Tool):any{
    if(t.type=="callApi"){
        return {
            name:t.name,
            descriptio:t.desc
        }
    }
    
}
