import app from "./api/api.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => { console.log("Express server is live") });