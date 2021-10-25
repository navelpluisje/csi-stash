/* eslint-disable camelcase */
import { PluginTypes } from '@constants';

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
  pluginType: PluginTypes;
  plugin_type: PluginTypes;
  type: ZoneType;
}

export type ZoneResponse = Array<Zone>

export type ZoneCollection = {
  [config: number]: {
    [id: number]: Zone,
  },
}
