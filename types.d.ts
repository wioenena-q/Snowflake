import type { DISCORD_EPOCH, TWITTER_EPOCH } from './dist/types/constants';
import type { DiscordSnowflake } from './dist/types/DiscordSnowflake';
import type { ParsedSnowflake, Snowflake } from './dist/types/Snowflake';
import type { TwitterSnowflake } from './dist/types/TwitterSnowflake';

declare module '@wioenena.q/snowflake' {
  export {
    DiscordSnowflake,
    Snowflake,
    ParsedSnowflake,
    TwitterSnowflake,
    DISCORD_EPOCH,
    TWITTER_EPOCH
  };
}
