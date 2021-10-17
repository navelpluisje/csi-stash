export interface Configuration {
  id: number;
  name: string;
  description: string;
  author: string;
  // eslint-disable-next-line camelcase
  controller_id: number;
}

export type ConfigurationResponse = Array<Configuration>

export type ConfigurationCollection = {
  [id: number]: Configuration,
}
