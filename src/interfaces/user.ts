export default interface IUser {
  _id: any;
  firstName: string;
  email: string;
  password?: string;
  admin: boolean;
}
