const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: http://0.0.0.0:${port}`);
});
