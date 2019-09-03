import { SnoowrapOptions } from "snoowrap";

const redditConfig: SnoowrapOptions = {
  userAgent: 'NHL-GDT-BOT',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN,
}

export default redditConfig