const { expect } = require('chai');
const { Snowflake } = require('../../../index.cjs');

describe('Snowflake', () => {
  const epoch = Date.now();
  const snowflake = new Snowflake(epoch);

  it('The epoch must be the specified epoch', () => {
    expect(snowflake.epoch).eq(BigInt(epoch));
  });

  it('Generate a snowflake ID and parse', () => {
    const id = snowflake.generate(0x1, 0x0);
    expect(Number(id)).greaterThan(0);
    const parsed = snowflake.parse(id);
    expect(parsed.workerId).eq(1n);
    expect(parsed.processId).eq(0n);
  });

  it("Iterate through the snowflake's ID", () => {
    const ids = [...snowflake.iterate(10)];
    expect(ids.length).eq(10);
    ids.forEach((id) => {
      expect(Number(id)).greaterThan(0);
    });
  });
});
