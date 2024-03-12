import "dotenv/config";

import { EmbedBuilder, WebhookClient } from "discord.js";

const webhookClient = new WebhookClient({
  url: process.env.DISCORD_WEBHOOK_URL!,
});

const embed = new EmbedBuilder().setTitle("Some Title").setColor(0x00ffff);

webhookClient.send({
  content: "Webhook test",
  username: "Github CMS",
  avatarURL:
    "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
  embeds: [embed],
});
