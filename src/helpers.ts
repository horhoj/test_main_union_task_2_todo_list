import { ParentCSSelectorContract, RenderErrorMsgContract } from './contracts/contracts';

export const mount = (parent: ParentCSSelectorContract, html: string) => {
  const parentNode = document.querySelector(parent);
  if (parentNode === null) {
    throw new Error(RenderErrorMsgContract.ERROR_MOUNT);
  }
  parentNode.innerHTML = html;
};
