export const ENVs = {
  dev: 'dev',
  test: 'test',
  prod: 'prod',
};

export const getEnv = () => {
  const nodeEnv = process.env.NODE_ENV;
  if (!nodeEnv) {
    throw new Error('Environment not set');
  }
  return ENVs[nodeEnv];
};
