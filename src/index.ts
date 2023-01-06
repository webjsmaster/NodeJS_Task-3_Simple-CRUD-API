import { port } from "./utils/port"
import * as http from "http"
import {del, get, post, put} from "./routes";
import { processingResponse } from "./utils/processingResponse";

export const server = http.createServer((req, res) => {
    try {
        switch (req.method) {
            case 'GET': {
                get(req, res)
                break
            }
            case 'POST': {
                post(req, res)
                break
            }
            case 'PUT': {
                put(req, res)
                break
            }
            case 'DELETE': {
                del(req, res)
                break
            }
            default:
                throw new Error('Unsupported operation')
        }
    } catch (error) {
		processingResponse(res, 500, {'message' : 'Server error'})
    }
})

server.listen(port, () => {
	console.log(`Server running on port: ${port}, whith pid: ${process.pid}`)
})

server.on('close', () => {
	server.close()
})


