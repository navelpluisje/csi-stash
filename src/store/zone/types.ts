export enum ZoneType {
  Base = 'base',
  Effect = 'effect',
  Instrument = 'instrument',
}

export interface Zone {
  id: number;
  name: string;
  description: string;
  author: string;
  type: ZoneType;
  // eslint-disable-next-line camelcase
  configuration_id: number;
}

export type ZoneResponse = Array<Zone>

export type ZoneCollection = {
  [config: number]: {
    [id: number]: Zone,
  },
}
