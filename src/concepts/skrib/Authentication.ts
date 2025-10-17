import { Collection, Db } from "npm:mongodb";
import { Empty, ID } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";


// Declare collection prefix, use concept name
const PREFIX = "Authenticate" + ".";


//internal ids
type User = ID;

/**
 * a set of Users with
 *  a username String
 *  a password String
 */
interface Users {
  _id: User;
  username: string;
  password: string;
}



export default class AuthenticationConcept {
  users: Collection<Users>;


  constructor(private readonly db: Db) {
    this.users = this.db.collection(PREFIX + "users");
  }



  async register({ username, password }: { username: string; password: string }): Promise<{user: User}| {error: string}> {

    const existingUser = await this.users.findOne({username});
    if (existingUser)
        return {error: 'username is already in use'};

    const userId = freshID() as User;
    await this.users.insertOne({
      _id: userId,
      username,
      password,
    });
    return { user: userId };
  }


async deleteUser({ user }: { user: User }): Promise<Empty| {error: string}> {

    const existingUser = await this.users.findOne({_id: user});
    if (!existingUser)
        return {error: 'user does not exist'};


    await this.users.deleteOne({_id: user});
    return {};
  }




  async changePassword({ user, newPassword }: { user: User; newPassword: string }): Promise<Empty|{error: string}> {
    const existingUser = await this.users.findOne({ _id: user });
    if (!existingUser) {
      return { error: `User not found` };
    }
    await this.users.updateOne({_id: user }, { $set: { password: newPassword } });
    return {};
  }

  async authenticate({ username, password }: { username: string; password: string }): Promise<{user: User}| {error: string}> {

    const existingUser = await this.users.findOne({username, password});
    if (existingUser)
        return {user: existingUser._id};

    return { error: `no user with username ${username} and password ${password}` };
  }


  /**
   * returns all users
   */
  async _getAllUsers(): Promise<Users[]> {
    return await this.users.find().toArray();
  }
}
