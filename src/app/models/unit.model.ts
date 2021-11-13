export interface UnitModel {
  owner: string;
  nfcId: string;
  status: string;
}

export const createInitialUnitModel = (): UnitModel => ({
  owner: '',
  nfcId: '',
  status: ''
});
