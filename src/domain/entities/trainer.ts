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
    }
  })
);

export default Trainer;
