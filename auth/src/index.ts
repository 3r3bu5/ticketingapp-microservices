import { connectDB } from './config/db.config';
import {app} from './app'

connectDB()

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
