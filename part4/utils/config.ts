export const url = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI as string
  : process.env.MONGODB_URI as string;
export const PORT = process.env.PORT as string;
