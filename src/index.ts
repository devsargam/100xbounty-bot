import { Probot } from "probot";

export default (app: Probot) => {
  app.log.info("Yay! The app was loaded!");

  app.on("issues.opened", async (context) => {
    if(context.isBot) return;
    app.log.info("An issue was edited");
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });

  app.on("pull_request.opened", async (context) => {
    if(context.isBot) return;
    // TODO: Handle case when pr is opened
    app.log.info("An pr was created");
    const issueComment = context.issue({
      body: "Thanks for opening this PR!",
    });
    await context.octokit.issues.createComment(issueComment);
  })

  app.on("issue_comment.created", async(context) => {
    if(context.isBot) return;
    // TODO: Handle case when comment is created
    app.log.info("A comment was created");
    const issueComment = context.issue({
      body: "Thanks for creating a comment!",
    });
    await context.octokit.issues.createComment(issueComment);
  })
};
