import { DISCORD_EPOCH, TWITTER_EPOCH } from './dist/types/constants';
import { DiscordSnowflake } from './dist/types/DiscordSnowflake';
import { ParsedSnowflake, Snowflake } from './dist/types/Snowflake';
import { TwitterSnowflake } from './dist/types/TwitterSnowflake';

declare const _default: {
  DiscordSnowflake: typeof DiscordSnowflake;
  Snowflake: typeof Snowflake;
  TwitterSnowflake: typeof TwitterSnowflake;
  DISCORD_EPOCH: typeof DISCORD_EPOCH;
  TWITTER_EPOCH: typeof TWITTER_EPOCH;
};

declare module '@wioenena.q/snowflake' {
  export {
    DiscordSnowflake,
    Snowflake,
    ParsedSnowflake,
    TwitterSnowflake,
    DISCORD_EPOCH,
    TWITTER_EPOCH
  };

  export = _default;
}
