import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const body = req.body

            if (!body.countries) {
                res.status(400).send({ error: 'Unavailabe content' })
            }

            const jsonDirectory = path.join(process.cwd(), 'json');
            const dataString = await fs.readFile(jsonDirectory + '/countries.json', 'utf8');
            const data = JSON.parse(dataString)

            const flags = body.countries.map(country => ({
                code: country,
                flag: data[country].flag,
                country: data[country].name,
            }))

            res.status(200).json(flags);
        } else {
            res.status(400).send({ error: 'Unavailabe content' })
        }
    } catch (error) {
        res.status(400).send({ error: 'Unavailabe content' })
    }
}