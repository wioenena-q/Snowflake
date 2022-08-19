export const handleId = (id: string | bigint) =>
  typeof id === 'bigint' ? id : BigInt(id);
