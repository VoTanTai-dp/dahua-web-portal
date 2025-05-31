require('dotenv').config();

const app = require('./src/app');

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});