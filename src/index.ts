import { createEventHandler } from "@octokit/webhooks";
import EventSource from "eventsource";
import "dotenv/config";

const webhookProxyUrl = "https://smee.io/BjvGNtdloGcCODsW";

const source = new EventSource(webhookProxyUrl);

source.onmessage = (event) => {
  const webhookEvent = JSON.parse(event.data);

  const eventHandler = createEventHandler({
    async transform(event) {
      return event;
    },
  });

  eventHandler.on("issue_comment.created", ({ id, name, payload }) => {
    console.log("new issue comment created");
    console.log(id);
    console.log(name);
    console.log(payload);
  });

  eventHandler
    .receive({
      id: webhookEvent["x-github-delivery"],
      name: webhookEvent["x-github-event"],
      payload: webhookEvent.body,
    })
    .catch();
};
