export interface OutcomeCategory {
  id: number;
  name: string;
}

export interface Outcome {
  id: number;
  name: string;
  category_id:number;
  date: Date;
  value:number;
}

export interface ChartValue {
  label:string,
  value:number
}
