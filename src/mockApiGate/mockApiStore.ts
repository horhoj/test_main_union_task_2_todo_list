import { TodoContract } from '~/contracts/contracts';
import { getUUID } from '~/utils/getUUID';

const LS_STORE_KEY = 'LS_STORE_KEY';

const makeDefaultMockApiStore = (): TodoContract[] => [
  { id: getUUID(), isDone: false, text: 'Тестовое задание' },
  { id: getUUID(), isDone: true, text: 'Прекрасный код' },
  { id: getUUID(), isDone: false, text: 'Покрытие тестами' },
];

let store: TodoContract[] = [];
const mockApiStoreLoadToLS = () => {
  const storeData = localStorage.getItem(LS_STORE_KEY);
  if (storeData === null) {
    store = makeDefaultMockApiStore();
    return;
  }
  store = JSON.parse(storeData);
};

export const mockApiStoreSaveToLS = () => {
  localStorage.setItem(LS_STORE_KEY, JSON.stringify(store));
};

mockApiStoreLoadToLS();

export const mockApiStore = store;
