import { EmbedBuilder } from "discord.js";
import { discordWebhookClient } from "../discord/webhook.js";
import { extractAmount } from "../utils.js";
import { IssueCommentSchemaType } from "../validator/index.js";

type CommentHandlerType = ({
  id,
  payload,
}: {
  id: string;
  payload: IssueCommentSchemaType;
}) => void;

export const commentHandler: CommentHandlerType = async ({ payload }) => {
  const isCommentValid =
    payload.comment.user.login === process.env.GITHUB_BOUNTY_ISSUER_USERNAME;
  if (!isCommentValid) return;

  const amount = extractAmount(payload.comment.body);
  if (!amount) return;

  const embed = new EmbedBuilder()
    .setTitle(amount)
    .setURL("https://discord.js.org/");

  await discordWebhookClient.send({
    username: "github",
    embeds: [embed],
    avatarURL:
      "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
  });
};
