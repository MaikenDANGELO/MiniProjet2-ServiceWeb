/* eslint-disable @typescript-eslint/no-explicit-any */
import TestService from "../services/test.service";

export const useTest = () => {

  async function getPublic() {
    const res: any = await TestService.getPublic();
    return res;
  }

  async function getPrivate() {
    const res: any = await TestService.getPrivate();
    return res;
  }


  return {
    getPublic,
    getPrivate
  }
}
