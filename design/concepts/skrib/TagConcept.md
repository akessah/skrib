# Concept: Tag [User, Item]

**Purpose**: label items to assist in searching and organization

**Principle**: Various users add tags to items. Then, those items can be displayed in groups by shared tag and users can search for items with a specific tag.

**State**:

    a set of Tags with
      a label String
      an item Item
      a user User
      a private Flag

**Actions**:

    addTag (user: User, label: String, item: Item): (tag: Tag)
      requires: no Tag by user associating item with label
      effects: creates Tag by user associating item with label

    removeTag (tag: Tag)
      effects: deletes tag from Tag set

    markPrivate (tag: Tag)
      requires: tag's private flag is false
      effects: changes tag's private flag to true

    markPublic (tag: Tag)
      requires: tag's private flag is true
      effects: changes tag's private flag to false
