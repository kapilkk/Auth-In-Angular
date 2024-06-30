export interface IUser {
  id: number;
  username: string;
  firstName: string;
  maidenName: string;
  lastName: string;
  email: string;
  gender: "male" | "female";
  image: string;
  role: string;
  phone: string;
  token: string;
  refreshToken: string;
}
