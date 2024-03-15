import { WebhookClient } from "discord.js";

export const discordWebhookClient = new WebhookClient({
  url: process.env.DISCORD_WEBHOOK_URL!,
});
