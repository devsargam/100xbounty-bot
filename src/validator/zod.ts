import { z } from "zod";

export const issueCommentSchema = z.object({
  action: z.string(),
  comment: z.object({
    body: z.string(),
    user: z.object({
      login: z.string(),
    }),
  }),
});
