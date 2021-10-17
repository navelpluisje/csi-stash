export interface Zone {
  id: number;
  name: string;
  description: string;
  author: string;
}

export type ZoneResponse = Array<Zone>

export type ZoneCollection = {
  [config: number]: {
    [id: number]: Zone,
  },
}
