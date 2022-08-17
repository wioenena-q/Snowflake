export const WORKER_ID_BITS = 5n;
export const PROCESS_ID_BITS = 5n;
export const MAX_WORKER_ID = -1n ^ (-1n << WORKER_ID_BITS);
export const MAX_PROCESS_ID = -1n ^ (-1n << PROCESS_ID_BITS);
export const SEQUENCE_BITS = 12n;
export const WORKER_ID_SHIFT = SEQUENCE_BITS;
export const PROCESS_ID_SHIFT = SEQUENCE_BITS + WORKER_ID_BITS;
export const TIMESTAMP_SHIFT = SEQUENCE_BITS + WORKER_ID_BITS + PROCESS_ID_BITS;
export const SEQUENCE_MASK = -1n ^ (-1n << SEQUENCE_BITS);
export const WORKER_ID_MASK = 0x1f000n;
export const PROCESS_ID_MASK = 0x3e0000n;

let lastTimestamp = -1n;
let sequence = 0n;

/**
 * @see {@link https://discord.com/developers/docs/reference#snowflakes}
 */
export const DISCORD_EPOCH = 1420070400000n;
/**
 * @see {@link https://github.com/twitter-archive/snowflake}
 */
export const TWITTER_EPOCH = 1288834974657n;

/**
 *
 * Generate a snowflake ID.
 * @param {number | bigint} epoch - Epoch in milliseconds
 * @param {number | bigint?} [workerId] - Worker ID
 * @param {number | bigint?} [processId] - Process ID
 * @returns Snowflake ID
 */
export function generateSnowflakeID(
  epoch: number | bigint,
  workerId: number | bigint = 0x1n,
  processId: number | bigint = 0x0n
) {
  epoch = typeof epoch === "bigint" ? epoch : BigInt(epoch);
  workerId = typeof workerId === "bigint" ? workerId : BigInt(workerId);
  processId = typeof processId === "bigint" ? processId : BigInt(processId);

  if (workerId > MAX_WORKER_ID || workerId < 0n) {
    throw new RangeError(
      `Worker id can't be greater than ${MAX_WORKER_ID} or less than 0`
    );
  }

  if (processId > MAX_PROCESS_ID || processId < 0n) {
    throw new RangeError(
      `Process id can't be greater than ${MAX_PROCESS_ID} or less than 0`
    );
  }

  let timestamp = BigInt(Date.now());

  if (lastTimestamp === timestamp) {
    sequence = (sequence + 1n) & SEQUENCE_MASK;

    if (sequence === 0n) {
      while ((timestamp = BigInt(Date.now())) <= lastTimestamp);
    }
  } else sequence = 0n;

  if (timestamp < lastTimestamp) {
    throw new Error(
      `Clock moved backwards.  Refusing to generate id for ${
        lastTimestamp - timestamp
      } milliseconds`
    );
  }

  lastTimestamp = timestamp;
  return (
    ((timestamp - epoch) << TIMESTAMP_SHIFT) |
    (processId << PROCESS_ID_SHIFT) |
    (workerId << WORKER_ID_SHIFT) |
    sequence
  );
}

/**
 *
 * Parse a snowflake ID.
 * @param {number | bigint} epoch - Epoch in milliseconds
 * @param {number | bigint | string} id - Snowflake ID
 * @returns {ParsedSnowflake} - Parsed snowflake ID
 */
export function parseSnowflakeID(
  epoch: number | bigint,
  id: number | bigint | string
) {
  epoch = typeof epoch === "bigint" ? epoch : BigInt(epoch);
  id = typeof id === "bigint" ? id : BigInt(id);

  return {
    timestamp: (id >> TIMESTAMP_SHIFT) + epoch,
    workerId: (id & WORKER_ID_MASK) >> WORKER_ID_SHIFT,
    processId: (id & PROCESS_ID_MASK) >> PROCESS_ID_SHIFT,
    sequence: id & SEQUENCE_MASK
  };
}

/**
 *
 * Generate a Discord snowflake ID.
 * @param {number | bigint?} [workerId] - Worker ID
 * @param {number | bigint?} [processId] - Process ID
 * @returns Snowflake ID
 */
export function generateDiscordID(
  workerId?: number | bigint,
  processId?: number | bigint
) {
  return generateSnowflakeID(DISCORD_EPOCH, workerId, processId);
}

/**
 *
 * Parse a Discord snowflake ID.
 * @param {number | bigint | string} id - Snowflake ID
 * @returns {ParsedSnowflake} - Parsed snowflake ID
 */
export function parseDiscordID(id: number | bigint | string) {
  return parseSnowflakeID(DISCORD_EPOCH, id);
}

/**
 *
 * Generate a Twitter snowflake ID.
 * @param {number | bigint?} [workerId] - Worker ID
 * @param {number | bigint?} [processId] - Process ID
 * @returns Snowflake ID
 */
export function generateTwitterID(
  workerId?: number | bigint,
  processId?: number | bigint
) {
  return generateSnowflakeID(TWITTER_EPOCH, workerId, processId);
}

/**
 *
 * Parse a Twitter snowflake ID.
 * @param {number | bigint | string} id - Snowflake ID
 * @returns {ParsedSnowflake} - Parsed snowflake ID
 */
export function parseTwitterID(id: number | bigint | string) {
  return parseSnowflakeID(TWITTER_EPOCH, id);
}

export interface ParsedSnowflake {
  timestamp: bigint;
  workerId: bigint;
  processId: bigint;
  sequence: bigint;
}
