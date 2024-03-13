import { createEventHandler } from "@octokit/webhooks";
import EventSource from "eventsource";
import "dotenv/config";
import { issueCommentSchema } from "./validator/zod.js";
import { extractAmount } from "./utils.js";

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
    const result = issueCommentSchema.safeParse(payload);
    if (!result.success) return console.log(result.error);

    const comment = result.data;
    const isCommentValid =
      comment.comment.user.login === process.env.GITHUB_BOUNTY_ISSUER_USERNAME;
    if (!isCommentValid) return;

    const amount = extractAmount(comment.comment.body);
    if (!amount) return;
  });

  eventHandler
    .receive({
      id: webhookEvent["x-github-delivery"],
      name: webhookEvent["x-github-event"],
      payload: webhookEvent.body,
    })
    .catch();
};
