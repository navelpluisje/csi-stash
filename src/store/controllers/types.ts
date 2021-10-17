export interface Controller {
  id: number;
  brand: string;
  model: string;
  configurations: number;
}

export type ControllerCollection = {
  [id: number]: Controller,
}
