import dotenv from 'dotenv';

dotenv.config();

export default { reddit: require('./reddit').default };
