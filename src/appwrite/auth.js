import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setProject(conf.appwriteProjectId)
      .setEndpoint(conf.appwriteUrl);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      if (user) {
        //call another method for directly login after registering
        return this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      throw error();
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (error) {
      throw error();
    }
  }
}

const authService = new AuthService();

export default authService;
