import cluster from "cluster";
import { IncomingMessage, ServerResponse } from "http";
import UserDB from "../data/User";
import { processingResponse } from "../utils/processingResponse";



export function getUsers ( req:IncomingMessage, res: ServerResponse, usersWorker: UserDB) {
	//const users = fetchAllUsers()
	//const users = serializer({data: UserDB.getAll()})

    // @ts-ignore
    //process.send(JSON.stringify({ action: 'set' }));
	if (cluster.isWorker) {
		(process as any).send(JSON.stringify({ action: 'get'}));
		console.log('usersWorker', usersWorker.getAll());
		
	}


	processingResponse(res, 200, 'Hello from Get Method!!!')
}