import {Request, Response} from 'express';
import {PORT} from './constants';
import {app, server} from './app';
import logger from './logger/winston';
import cluster from 'cluster';
import {cpus} from 'os'
import {runInClusterMode} from './lib/stdinParser';

const numCpus = cpus().length;

// cluster.isMaster is deprecated https://nodejs.org/api/cluster.html#clusterismaster
const initClusterMode = () => {
	if (cluster.isPrimary) {
		for (let i = 0; i < numCpus; i++) {
			cluster.fork();
		}
		cluster.on('exit', (worker, code, signal) => {
			if (signal) {
				console.log(`worker was killed by signal: ${signal}`);
			} else if (code !== 0) {
				console.log(`worker exited with error code: ${code}`);
			} else {
				console.log(`worker ${worker.process.pid} died`);
			}
		})
	} else {
        server.listen(PORT, () => {
            logger.info(`[CLUSTER] Express Server listening on port: ${PORT}`);
        });
	}
}

app.get('/', (req: Request, res: Response) => {
    const session = req.session;
    if (session.user) {
        res.redirect('/home');
        return;
    }
    res.render('pages/index');
});

if (runInClusterMode()) {
    initClusterMode();
} else {
    server.listen(PORT, () => {
        logger.info(`Express Server listening on port: ${PORT}`);
    });
}

