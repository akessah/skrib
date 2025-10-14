**Concept: Notify[User]**

Purpose: notify users of variuos events

Principle: A user recieves a notification after a certain event which they can then view in whatever inbox the system specifies

State:

    a set of Notifications with
      a user User
      a message String

actions:

    notify (user: User, message: String):(notification:Notification)
      effects: creates a Notification for user with message, adds it to the Notifications set, and returns it to the user
