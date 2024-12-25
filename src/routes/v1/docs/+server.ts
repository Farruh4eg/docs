import type { RequestHandler } from '@sveltejs/kit';
import fs from 'node:fs/promises';

const prefix = './src/routes/v1/docs/files';

export const GET: RequestHandler = async ({ url }) => {
	let query = url.searchParams.get('q') || '';
	console.log(fs.readdir('./'));

	try {
		const fileContent = await fs.readFile(`${prefix}/${query}.txt`, { encoding: 'utf-8' });
		return new Response(fileContent);
	} catch (e) {
		console.log(e);
	}

	return new Response();
};
