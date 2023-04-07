export interface ITrainer {
  name: string;
  password: string;
  team: string;
  nickname?: string;
  pepper?: string;
  createdAt?: Date;
  lastLogin?: Date;
}
