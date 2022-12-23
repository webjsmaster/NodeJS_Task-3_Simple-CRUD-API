import { port } from "./utils/port"
import * as http from "http"
import {get} from "./routes";



const server = http.createServer((req, res) => {
	switch (req.method) {
		case "GET": {
			get(req, res)
			break
		}
	}
})

server.listen(port, () => {
	console.log(`Server rening on port: ${port}`)
})
console.log(port)

