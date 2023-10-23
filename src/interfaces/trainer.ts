export interface ITrainer {
  _id?: any;
  email: string;
  name: string;
  password: string;
  team: string;
  nickname?: string;
  createdAt?: Date;
  lastLogin?: Date;
}
