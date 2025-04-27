/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthService from "../services/auth.service";

export const useAuth = () => {

  async function SignIn(email: string, password: string) {
    const res: any = await AuthService.signin(email, password);
    return res;
  }

  async function SignUp(firstName: string, lastName: string, email: string, password: string) {
    const res: any = await AuthService.signup(firstName, lastName, email, password);
    return res;
  }


  return {
    SignIn,
    SignUp
  }
}
