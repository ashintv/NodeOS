export interface INode{
    id:string,
    name:string,
    //typeVersion:number
    type:string ,
    position: [number , number],
    disabled?:boolean,
    notes:string,
    
}


type Tool  = "callApi" 
export interface AiNode{
    model:string,
    apiKey:string,
    query:string,
    tools:Tool[]
}