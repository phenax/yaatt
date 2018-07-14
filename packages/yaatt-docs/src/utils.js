
import crypto from 'crypto';

export const generateRandomHex = (size?: number = 10): string =>
	crypto.randomBytes(size / 2).toString('hex');

export const toUrlSafeString = (str: string): string =>
	(str || '')
		.replace(/^https?:\/\//gi, '')
		.replace(/[^A-Za-z0-9]+/gi, '-');
