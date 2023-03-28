import * as dotEnv from 'dotenv';
import * as http from 'http';
import compression from 'compression'; // Compresses requests
import cors from 'cors';
import defaultRoute from '@/routes/DefaultRoute';
import express from 'express';
import helmet from 'helmet';

const defaultPort = 3000;
dotEnv.config();

const app = express();
const port =
  (process.env.PORT as string) !== '' ? process.env.PORT : defaultPort;
const host = (process.env.HOST as string) !== '' ? process.env.HOST : '0.0.0.0';
const allowedOrigins = ['http://localhost'];

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: allowedOrigins,
  })
);

app.get('/', defaultRoute);

/*
 * Sample routes
 * app.post('/users', CreateUser);
 * app.get('/users/email/:email', FindUserByEmail);
 */

const server = http.createServer(app);

server.listen(port as number, host as string, () => {
  console.log(`
🚀 Server ready at: http://${host}:${port}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`);
});

export default server;
