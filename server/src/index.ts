import { submissionQueueEvents } from "./queue/queue-events.js";

// queue events can potentially replace pubsubs in this type of design
// for this mantain a map/set of submissionId and socket but this would wake up all the ws servers just to send msg to one user


import app from "./api/api.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => { console.log("Express server is live") });