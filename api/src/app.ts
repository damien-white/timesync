import 'reflect-metadata';
import express, { Express, json, Request, Response, urlencoded } from 'express';
import { createConnection } from 'typeorm';

const app: Express = express();

const port: number = +(process.env.PORT ?? 4949);
const hostname: string = process.env.HOST ?? 'localhost';

/** Main entrypoint into the application */
async function start(): Promise<void> {
  /**  promises are not handled and crash process */
  process.on('unhandledRejection', (error: Error) => {
    console.error(error);
    throw error;
  });

  /** Initialize database connection */
  try {
    await createConnection();
  } catch (error) {
    throw new Error(error);
  }

  // Apply middleware
  app.use(json());
  app.use(urlencoded({ extended: true }));

  /** Attach controllers to application instance */
  app.use('/', (req: Request, res: Response) => {
    res.status(200).json({
      state: 'healthy',
    });
  });

  /** Start listening for connections */
  app.listen(port, hostname, () => {
    console.log(`Server started. Listening at: http://${hostname}:${port}/`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
