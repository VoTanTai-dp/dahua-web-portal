require('dotenv').config();
const app = require('./src/app');

const { startCountSocketServer } = require('./src/wsServer');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

startCountSocketServer(9998);