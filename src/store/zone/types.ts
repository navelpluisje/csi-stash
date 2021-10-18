export interface Zone {
  id: number;
  name: string;
  description: string;
  author: string;
  type: string;
  // eslint-disable-next-line camelcase
  configuration_id: number;
}

export type ZoneResponse = Array<Zone>

export type ZoneCollection = {
  [config: number]: {
    [id: number]: Zone,
  },
}
