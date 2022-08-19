const { DiscordSnowflake } = require('./dist/DiscordSnowflake');
const { Snowflake } = require('./dist/Snowflake');
const { TwitterSnowflake } = require('./dist/TwitterSnowflake');
const { DISCORD_EPOCH, TWITTER_EPOCH } = require('./dist/constants');

module.exports = {
  DiscordSnowflake,
  Snowflake,
  TwitterSnowflake,
  DISCORD_EPOCH,
  TWITTER_EPOCH
};
