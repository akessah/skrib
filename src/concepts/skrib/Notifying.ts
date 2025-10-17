import { Collection, Db } from "npm:mongodb";
import { ID } from "@utils/types.ts";
import { freshID } from "@utils/database.ts";


// Declare collection prefix, use concept name
const PREFIX = "Notifying" + ".";

// Generic types of this concept
type User = ID;


//internal ids
type Notification = ID;

/**
 * a set of Notifications with
 *  a message String
 *  a recipient User
 */
interface Notifications {
  _id: Notification;
  recipient: User;
  message: string;
  read: boolean;
}


/**
 * @concept Post
 * @purpose to allow users to upload content, generally to ask for book recommendations
 */
export default class NotifyingConcept {
  notifications: Collection<Notifications>;


  constructor(private readonly db: Db) {
    this.notifications = this.db.collection(PREFIX + "notifications");
  }


  /**
   * createPost (user: User, body: String):(post:Post)
   *
   * @effects creates a post with body by user and adds it to Posts set
   *
   */
  async notify({ user, message }: { user: User; message: string }): Promise<{notification: Notification}> {

    const notificationId = freshID() as Notification;
    await this.notifications.insertOne({
      _id: notificationId,
      recipient: user,
      message,
      read: false
    });
    return { notification: notificationId };
  }


  async read({notification}: {notification: Notification}): Promise<{message: string}|{error: string}>{
    const existingNotification = await this.notifications.findOne({ _id: notification });
    if (!existingNotification) {
      return { error: `Survey with ID ${notification} not found.` };
    }

    if(!existingNotification.read)
        await this.notifications.updateOne({_id: notification }, { $set: { read: true } });
    return {message: existingNotification.message}

  }



  /**
   * returns all notifications to specified user
   */
  async _getNotificationsByUser({ recipient }: { recipient: User }): Promise<Notifications[]> {
    return await this.notifications.find({ recipient }).toArray();
  }

  /**
   * returns all read notifications to specified user
   */
  async _getReadNotificationsByUser({ recipient }: { recipient: User }): Promise<Notifications[]> {
    return await this.notifications.find({ recipient, read: true }).toArray();
  }

  /**
   * returns all unread notifications to specified user
   */
  async _getUnreadNotificationsByUser({ recipient }: { recipient: User }): Promise<Notifications[]> {
    return await this.notifications.find({ recipient, read: false }).toArray();
  }

  /**
   * returns all posts
   */
  async _getAllNotifications(): Promise<Notifications[]> {
    return await this.notifications.find().toArray();
  }
}
