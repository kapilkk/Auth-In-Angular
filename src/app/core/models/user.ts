export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "male" | "female";
  image: string;
  token: string;
  refreshToken: string;
}
