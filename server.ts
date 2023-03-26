import express, { Response } from 'express';
import env from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import router from './src/routes';
import mongoose, { ConnectOptions, Path } from 'mongoose';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import path from 'path';
var cors = require('cors');

// PORT
const PORT = process.env.PORT || 8080;

env.config({ path: path.resolve(__dirname, './.env') });

const app = express();
// serve static
app.use(serveStatic('public/ftp', { index: ['default.html', 'default.htm'] }));
app.use('/dist', express.static(path.resolve(__dirname, '../client/dist')));
// router.get('/', (req, res: Response) => {
//   res.download(path.resolve(__dirname, '../client/public/index.html'));
// });
app.use('/', express.static(path.join(__dirname, '../client/public/index.html')));
// const corsConfig = {
//   credentials: true,
//   origin: true,
// };
app.use(cors({ credentials: true, origin: process.env.CLIENT_URI }));
app.use(cookieParser());
app.use(helmet());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/** Parse the body - middleware */
app.use(express.json());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // res.setHeader('Cache-Control', 'max-age=1209600');
  // res.setHeader('Cache-Control', 'no-cache');
  next();
});

// routes
app.use(router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log('listening on port ', PORT));
  })
  .catch((error) => {
    console.log(error);
  });
