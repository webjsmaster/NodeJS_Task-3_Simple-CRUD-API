import { ServerResponse } from "http"

export function processingResponse (res: ServerResponse, status:number, message:{}) {
    res.writeHead(status, { 'Content-type': 'application/json'})
    res.end(JSON.stringify(message))
}