import mongoose from 'mongoose';

function ensureReplicaSetParam(uri: string) {
  const url = new URL(uri);
  const replicaSet = url.searchParams.get('replicaSet');

  if (!replicaSet) {
    throw new Error('Database URI must contain replicaSet query parameter');
  }
}

const connectDatabase = async () => {
  const URI = process.env.MONGO_URI;
  if (!URI) throw new Error('Database URI not defined');
  
  ensureReplicaSetParam(URI);

  try {
    await mongoose.connect(URI);
    console.info('Database connected');
  } catch (error) {
    console.error('Database not connected:', error);
    throw error;
  }
};

export default connectDatabase;
