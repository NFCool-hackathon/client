export interface TokenModel {
  uri: string;
  name: string;
}

export const createInitialTokenModel = (): TokenModel => ({
  uri: '',
  name: ''
});
