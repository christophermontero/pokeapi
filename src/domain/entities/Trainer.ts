import mongoose from 'mongoose';

const Trainer = mongoose.model(
  'Trainer',
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
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
      required: true
    },
    lastConnection: {
      type: Date,
      required: true,
      default: Date.now
    }
  })
);

export default Trainer;
