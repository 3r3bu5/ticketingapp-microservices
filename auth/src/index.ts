import { connectDB } from './config/db.config';
import { app } from './app';

connectDB();

if (!process.env.JWT_KEY) {
  throw new Error('JWT key must be defined');
}

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
