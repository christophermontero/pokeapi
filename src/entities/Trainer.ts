import mongoose from 'mongoose';

const trainerModel = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  } as mongoose.SchemaTypeOptions<string>,
  nickname: {
    type: String,
    trim: true,
    lowercase: true,
    required: false,
    unique: true
  } as mongoose.SchemaTypeOptions<string>,
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  } as mongoose.SchemaTypeOptions<string>,
  password: {
    type: String,
    trim: true,
    match:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/,
    required: true
  } as mongoose.SchemaTypeOptions<string>,
  team: {
    type: String,
    enum: ['red', 'blue', 'yellow'],
    required: true
  } as mongoose.SchemaTypeOptions<string>,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  } as mongoose.SchemaTypeOptions<Date>,
  lastConnection: {
    type: Date,
    required: false
  } as mongoose.SchemaTypeOptions<Date>
});

const Trainer = mongoose.model('Trainer', new mongoose.Schema(trainerModel));

export default Trainer;
