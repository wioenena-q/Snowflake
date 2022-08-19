import { TWITTER_EPOCH } from './constants';
import { Snowflake } from './Snowflake';

export class TwitterSnowflake extends Snowflake {
  public constructor() {
    super(TWITTER_EPOCH);
  }
}
