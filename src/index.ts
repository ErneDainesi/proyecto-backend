import {Request, Response} from 'express';
import {PORT} from './constants';
import {app, server} from './app';
import logger from './logger/winston';

app.get('/', (req: Request, res: Response) => {
    const session = req.session;
    if (session.user) {
        res.redirect('/products/view');
    }
    res.render('pages/index');
});

server.listen(PORT, () => {
	logger.info(`Express Server listening on port: ${PORT}`);
});

