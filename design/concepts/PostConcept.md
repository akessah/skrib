**Concept: Post [User]**

Purpose: allow users to upload content

Principle: A user creates and publishes a post which can then be seen publically.

State:

    a set of Posts with
      a body String
      an author User

actions:

    create (user: User, body: String):(post:Post)
      effects: creates a post with body by user and adds it to Posts set

    delete (post: Post)
      effects: removes said post from Posts set

    edit (post: Post, newBody: String)
        effects: replaces body of post with newBody
