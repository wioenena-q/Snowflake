const { expect } = require("chai");
const {
  generateSnowflakeID,
  parseSnowflakeID,
  parseDiscordID,
  MAX_WORKER_ID,
  MAX_PROCESS_ID
} = require("../../../dist");

describe("Snowflake ID", () => {
  it("should generate a snowflake ID", () => {
    const id = generateSnowflakeID(Date.now());
    expect(Number(id)).greaterThan(0);
  });

  it("Properly mask the ID of a snowflake", () => {
    const workerId = 0x1n;
    const processId = 0x0n;
    const epoch = BigInt(Date.now());
    const id = generateSnowflakeID(epoch, workerId, processId);
    const parsed = parseSnowflakeID(epoch, id);
    expect(parsed.workerId).eq(workerId);
    expect(parsed.processId).eq(processId);
    expect(Number(parsed.timestamp)).lessThan(Date.now() + 50);
  });

  it("Properly parse the ID instance in the Discord Snowflake reference", () => {
    const id = 175928847299117063;
    const timestamp = BigInt(new Date("2016-04-30 11:18:25.796 UTC").getTime());
    const parsed = parseDiscordID(id);
    expect(parsed.timestamp).eq(timestamp);
    expect(parsed.workerId).eq(0x0n);
    expect(parsed.processId).eq(0x1n);
  });
});
