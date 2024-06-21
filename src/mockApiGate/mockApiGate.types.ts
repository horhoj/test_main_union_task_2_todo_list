import { TodoContract } from '~/contracts/contracts';

export interface MockApiGateConstructorData {
  makeDelay: () => Promise<void>;
  getUniqueId: () => string;
  store: TodoContract[];
  saveStore: () => void;
}
