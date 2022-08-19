import {
  MAX_PROCESS_ID,
  MAX_WORKER_ID,
  PROCESS_ID_MASK,
  PROCESS_ID_SHIFT,
  SEQUENCE_MASK,
  TIMESTAMP_SHIFT,
  WORKER_ID_MASK,
  WORKER_ID_SHIFT
} from './constants';
import { handleId } from './utils';

/**
 * @class
 * @classdesc Base class for Snowflake based classes
 */
export class Snowflake {
  public declare epoch: bigint;

  #sequence: bigint = 0n;
  #lastTimestamp = -1n;

  /**
   *
   * @param {number | bigint} epoch - Epoch in milliseconds
   * @param {(number | bigint)?} [workerId] - Worker ID
   * @param {(number | bigint)?} [processId] - Process ID
   */
  public constructor(epoch: number | string | bigint) {
    epoch = typeof epoch === 'bigint' ? epoch : BigInt(epoch);

    Object.defineProperties(this, {
      epoch: {
        value: epoch,
        enumerable: true
      }
    });
  }

  /**
   *
   * Generate a snowflake ID.
   * @returns {bigint} Snowflake ID
   */
  public generate(
    workerId: string | number | bigint = 0x1n,
    processId: string | number | bigint = 0x0n
  ) {
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

    workerId = typeof workerId === 'bigint' ? workerId : BigInt(workerId);
    processId = typeof processId === 'bigint' ? processId : BigInt(processId);

    let timestamp = BigInt(Date.now());

    if (this.#lastTimestamp === timestamp) {
      this.#sequence = (this.#sequence + 1n) & SEQUENCE_MASK;

      if (this.#sequence === 0n) {
        while ((timestamp = BigInt(Date.now())) <= this.#lastTimestamp);
      }
    } else this.#sequence = 0n;

    if (timestamp < this.#lastTimestamp) {
      throw new Error(
        `Clock moved backwards.  Refusing to generate id for ${
          this.#lastTimestamp - timestamp
        } milliseconds`
      );
    }

    this.#lastTimestamp = timestamp;
    return (
      ((timestamp - this.epoch) << TIMESTAMP_SHIFT) |
      (processId << PROCESS_ID_SHIFT) |
      (workerId << WORKER_ID_SHIFT) |
      this.#sequence
    );
  }

  /**
   *
   * Parse a snowflake ID.
   * @param id - Snowflake ID
   * @returns {ParsedSnowflake} Parsed snowflake ID
   */
  public parse(id: string | bigint): ParsedSnowflake {
    id = handleId(id);
    return {
      timestamp: this.getTimestampFromSnowflakeId(id),
      workerId: this.getWorkerIdFromSnowflakeId(id),
      processId: this.getProcessIdFromSnowflakeId(id),
      sequence: this.getSequenceFromSnowflake(id)
    };
  }

  /**
   * Get the timestamp from a snowflake ID.
   * @param id - Snowflake ID
   * @returns {bigint} - Timestamp
   */
  public getTimestampFromSnowflakeId(id: string | bigint) {
    id = handleId(id);
    return (id >> TIMESTAMP_SHIFT) + this.epoch;
  }

  /**
   * Get the worker ID from a snowflake ID.
   * @param id - Snowflake ID
   * @returns {bigint} - Worker ID
   */
  public getWorkerIdFromSnowflakeId(id: string | bigint) {
    id = handleId(id);
    return (id & WORKER_ID_MASK) >> WORKER_ID_SHIFT;
  }

  /**
   * Get the process ID from a snowflake ID.
   * @param id - Snowflake ID
   * @returns {bigint} - Process ID
   */
  public getProcessIdFromSnowflakeId(id: string | bigint) {
    id = handleId(id);
    return (id & PROCESS_ID_MASK) >> PROCESS_ID_SHIFT;
  }

  /**
   * Get the sequence from a snowflake ID.
   * @param id - Snowflake ID
   * @returns {bigint} - Sequence
   */
  public getSequenceFromSnowflake(id: string | bigint) {
    id = handleId(id);
    return id & SEQUENCE_MASK;
  }

  /**
   * Iterates the id by the specified amount
   * @param n - How many iterate
   */
  public *iterate(n: number) {
    while (n-- !== 0) {
      yield this.generate();
    }
  }
}

export interface ParsedSnowflake {
  timestamp: bigint;
  workerId: bigint;
  processId: bigint;
  sequence: bigint;
}
