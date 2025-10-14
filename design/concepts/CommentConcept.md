**Concept: Comment [User, Post]**

Purpose: allow user to upload content related to a specific item

Principle: A user views an item and wants to express an opinion on it. They create and post a comment which is then publically visible and linked to that item

State:

    a set of Comments with
      a body String
      an author User
      a parent Post

    a set of Posts with
      an author User
      a body String

actions:

    create (user: User, body: String, parent: Post):(comment:Comment)
      effects: creates a comment with body by user that's child of parent and adds it to Comments set

    delete (comment: Comment)
      effects: deletes comment from Comments set

    edit (comment: Comment, newBody: String)
        effects: replaces body of comment with newBody
