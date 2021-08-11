export enum Frequency {
  WEEKLY,
  MONTHLY,
  ANNUAL,
}

export type Payment = {
  id?: string;
  name: string;
  amount: number;
  startDate: Date;
  frequency: Frequency;
};

export enum FetchStatus {
  IDLE,
  PENDING,
  DONE,
  ERROR,
}
