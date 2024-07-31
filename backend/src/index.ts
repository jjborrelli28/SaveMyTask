import * as dotenv from "dotenv";

import app from "./app";

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
