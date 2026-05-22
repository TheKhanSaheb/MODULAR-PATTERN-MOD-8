import dotenv from 'dotenv'
import { prototype } from 'events'
import path from 'path'
dotenv.config
({path:path.join(process.cwd(),'.env')})
const PORT = 5000;

const config = {
    connection_string: process.env.CONNECTION_STRING as string || '',
    port: process.env.PORT ||5000
}

export default config