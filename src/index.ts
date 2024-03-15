import { createEventHandler } from "@octokit/webhooks";
import "dotenv/config";
import EventSource from "eventsource";
import { commentHandler } from "./handlers";
import { EventCache } from "./cache";
import { issueCommentSchema } from "./validator";

const webhookProxyUrl = "https://smee.io/BjvGNtdloGcCODsW";

const cache = new EventCache();
const source = new EventSource(webhookProxyUrl);

source.onmessage = (event) => {
  const webhookEvent = JSON.parse(event.data);

  const eventHandler = createEventHandler({
    async transform(event) {
      return event;
    },
  });

  eventHandler.on("issue_comment.created", async ({ id, payload }) => {
    // TODO: Fix this somehow I am getting 2 messages for same event
    if (cache.idPresent(id)) return;
    cache.setId(id);
    console.log(payload);

    const result = issueCommentSchema.safeParse(payload);
    if (!result.success) return console.log(result.error);

    commentHandler({ id, payload: result.data });
  });

  eventHandler
    .receive({
      id: webhookEvent["x-github-delivery"],
      name: webhookEvent["x-github-event"],
      payload: webhookEvent.body,
    })
    .catch();
};
