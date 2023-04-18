import type { ServerResponse } from 'http';

import { match } from 'path-to-regexp';
import type { IncomingMessage } from 'connect';
import { WebApp } from 'meteor/webapp';

const matchRoute = match<{ lng: string }>('/:lng.json', { decode: decodeURIComponent });

const promisifiedAsset = (name: string) =>
	new Promise<string>((resolve, reject) => {
		Assets.getText(name, (err: any, data: string) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});

const i18nHandler = async function (req: IncomingMessage, res: ServerResponse) {
	const match = matchRoute(req.url ?? '/');

	if (match === false) {
		res.writeHead(400);
		res.end();
		return;
	}

	const { lng } = match.params;

	try {
		const data = await promisifiedAsset(`i18n/${lng}.i18n.json`);
		if (!data) {
			throw new Error();
		}

		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Content-Length', data.length);
		res.writeHead(200);
		res.end(data);
	} catch (e) {
		res.writeHead(400);
		res.end();
	}
};

WebApp.connectHandlers.use('/i18n/', i18nHandler);
