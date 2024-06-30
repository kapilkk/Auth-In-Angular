export interface IUserDetail {
  id: number;
  username: string;
  fullName: string;
  email: string;
  gender: "male" | "female";
  image: string;
  phone: string;
  role: string;
}
