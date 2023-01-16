import cluster from "cluster";
import { Action, User } from "../types/types";

export function setActionMassage(allUsers: Array<User>) {
	if (cluster.isWorker) {
		cluster.worker?.send({ type: "setWorker", body: allUsers } as { type: Action; body: Array<User> });
	} else {
		cluster.emit("message", { type: "setPrimary", body: allUsers } as { type: Action; body: Array<User> });
	}
}
