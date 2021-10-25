export enum ConfigSteps {
  Step1 = '/controllers',
  Step2 = '/controllers/[controllerId]',
  Step3 = '/controllers/[controllerId]/[configId]',
  Step4 = '/controllers/[controllerId]/[configId]/download',
}

export enum PluginTypes {
  VST = 'VST',
  VSTi = 'VSTi',
  VST3 = 'VST3',
  VST3i = 'VST3i',
  AU = 'AU',
  AUi = 'AUi',
  JS = 'JS',
  Cockos = 'Cockos',
  LV2 = 'LV2',
}
