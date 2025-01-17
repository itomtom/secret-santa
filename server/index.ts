import app from './app';
import { initDatabase } from './data';

const port = 3000;

initDatabase().then(() => {
  app.listen(port, () => {
    console.log('Server Listening on PORT:', 3000);
  });
});
