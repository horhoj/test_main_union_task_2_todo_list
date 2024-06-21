import { MockApiGate } from './mockApiGate';
import { mockApiStore, mockApiStoreSaveToLS } from './mockApiStore';
import { getUUID } from '~/utils/getUUID';
import { delay } from '~/utils/delay';

export const mockApiGate = new MockApiGate({
  makeDelay: () => delay(300),
  getUniqueId: () => getUUID(),
  store: mockApiStore,
  saveStore: () => mockApiStoreSaveToLS(),
});
