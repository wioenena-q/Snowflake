import {
  DISCORD_EPOCH,
  PROCESS_ID_MASK,
  PROCESS_ID_SHIFT,
  WORKER_ID_MASK,
  WORKER_ID_SHIFT
} from './constants';
import { Snowflake } from './Snowflake';
import { handleId } from './utils';

/**
 * @class
 * @classdesc Handles unique IDs for Discord
 */
export class DiscordSnowflake extends Snowflake {
  public constructor() {
    super(DISCORD_EPOCH);
  }

  /**
   * Get the worker ID from a snowflake ID.
   * @param id - Snowflake ID
   * @returns {bigint} - Worker ID
   */
  public override getWorkerIdFromSnowflakeId(id: string | bigint) {
    id = handleId(id);
    return (id & PROCESS_ID_MASK) >> PROCESS_ID_SHIFT; // There are swaps in Discord IDs
  }

  /**
   * Get the process ID from a snowflake ID.
   * @param id - Snowflake ID
   * @returns {bigint} - Process ID
   */
  public override getProcessIdFromSnowflakeId(id: string | bigint) {
    id = handleId(id);
    return (id & WORKER_ID_MASK) >> WORKER_ID_SHIFT; // There are swaps in Discord IDs
  }
}
