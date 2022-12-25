import { port } from "./utils/port"
import * as http from "http"
import {del, get, post, put} from "./routes";



export const server = http.createServer((req, res) => {
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
	}
})

server.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})

server.on('close', () => {
	server.close()
})


