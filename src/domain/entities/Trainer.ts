import mongoose from 'mongoose';

const Trainer = mongoose.model(
  'Trainer',
  new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    nickname: {
      type: String,
      trim: true,
      lowercase: true,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    team: {
      type: String,
      enum: ['rojo', 'azul', 'amarillo'],
      required: true
    },
    pepper: {
      type: String,
      required: true,
      min: 8,
      max: 8
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    lastConnection: {
      type: Date,
      required: false
    }
  })
);

export default Trainer;
