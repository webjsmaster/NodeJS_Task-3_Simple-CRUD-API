import { config } from 'dotenv';
import { resolve } from 'path';

config({
	path: resolve(process.cwd(), '.env'),
});

export let port = process.env.PORT;
