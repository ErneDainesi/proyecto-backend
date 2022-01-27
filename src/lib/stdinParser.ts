import { CLUSTER_MODE, SERVER_MODE_INDEX } from "../constants";

export const runInClusterMode = () => {
	return process.argv[SERVER_MODE_INDEX] === CLUSTER_MODE;
}

