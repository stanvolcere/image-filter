import { Request, Response, NextFunction } from 'express';
const keys = require('../../config/keys');

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
	if (req.headers.authorization) {
		const token = req.headers.authorization.replace('Bearer ', "");

		if (token !== keys.passphrase) {
			return res.status(401).send("You are not authenticated.");
		}

		// next() means proceed to the request handler 
		// from this middleware
		next();
	} else {
		return res.status(401).send("You are not authenticated.");
	}
}