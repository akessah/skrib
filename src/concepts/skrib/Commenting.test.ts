import { assertEquals, assertNotEquals, assertArrayIncludes } from "jsr:@std/assert";
import { testDb } from "@utils/database.ts";
import { ID, Empty } from "@utils/types.ts";
import CommentingConcept from "./Commenting.ts"; // Assuming the file is named Commenting.ts
import { Db, MongoClient } from "npm:mongodb"; // <--- Add these imports for MongoDB types

// Define specific ID types for better readability in tests
type TestUser = ID;
type TestItem = ID;
type TestComment = ID;

let db: Db | null = null; // <--- Change Deno.Kv to Db (from npm:mongodb)
let client: MongoClient | null = null; // <--- Change any to MongoClient (from npm:mongodb)
let commentingConcept: CommentingConcept;

const userAlice = "user:Alice" as TestUser;
const userBob = "user:Bob" as TestUser;
const itemPost1 = "item:Post1" as TestItem;
const itemPost2 = "item:Post2" as TestItem;

// Setup: Initialize the database and concept instance before each test
Deno.test.beforeEach(async () => {
    [db, client] = await testDb();
    commentingConcept = new CommentingConcept(db as Db); // Ensure db is typed as Db for the constructor
    console.log(`This is commentingConcept: ${commentingConcept}`);
});

// Teardown: Close the database connection after each test
Deno.test.afterEach(async () => {
    if (client) {
        await client.close();
    }
});

Deno.test("Action: createComment - Successfully creates a comment", async (t) => {
    console.log("--- Test: createComment ---");

    const initialComments = await commentingConcept._getAllComments();
    assertEquals(initialComments.length, 0, "Initially, there should be no comments.");
    console.log(`Initial comment count: ${initialComments.length}`);

    const body = "This is a great post!";
    const result = await commentingConcept.createComment({ user: userAlice, body, item: itemPost1 });

    // effects: creates a comment with body by user that's child of parent and adds it to Comments set
    assertNotEquals(result.comment, undefined, "A comment ID should be returned.");
    const newCommentId = result.comment as TestComment;
    console.log(`Created comment with ID: ${newCommentId}`);

    const allComments = await commentingConcept._getAllComments();
    assertEquals(allComments.length, 1, "There should be one comment after creation.");
    assertEquals(allComments[0]._id, newCommentId, "The returned comment ID should match the stored one.");
    assertEquals(allComments[0].author, userAlice, "The comment author should be Alice.");
    assertEquals(allComments[0].body, body, "The comment body should match.");
    assertEquals(allComments[0].parent, itemPost1, "The comment parent should be Post1.");
    console.log("Comment creation verified successfully.");
});

Deno.test("Action: editComment - Successfully edits an existing comment", async (t) => {
    console.log("--- Test: editComment ---");

    const initialBody = "Original comment body.";
    const createResult = await commentingConcept.createComment({ user: userAlice, body: initialBody, item: itemPost1 });
    const commentId = createResult.comment as TestComment;
    console.log(`Created comment with ID: ${commentId}, body: "${initialBody}"`);

    const newBody = "Updated comment body.";
    const editResult = await commentingConcept.editComment({ comment: commentId, newBody });

    // effects: replaces body of comment with newBody
    assertEquals(editResult, {}, "Editing a comment should return an empty object on success.");
    console.log(`Edited comment ID: ${commentId} with new body: "${newBody}"`);

    const commentsByAuthor = await commentingConcept._getCommentsByAuthor({ author: userAlice });
    assertEquals(commentsByAuthor.length, 1, "There should still be one comment by Alice.");
    assertEquals(commentsByAuthor[0]._id, commentId, "The edited comment ID should match.");
    assertEquals(commentsByAuthor[0].body, newBody, "The comment body should be updated.");
    console.log("Comment edit verified successfully.");
});

Deno.test("Action: editComment - Fails to edit a non-existent comment", async (t) => {
    console.log("--- Test: editComment (non-existent) ---");
    const nonExistentComment = "comment:nonexistent" as TestComment;
    const newBody = "Attempting to edit nothing.";
    const result = await commentingConcept.editComment({ comment: nonExistentComment, newBody });

    // requires: comment exists
    assertEquals(result, { error: `Comment with ID ${nonExistentComment} not found.` }, "Should return an error for non-existent comment.");
    console.log("Attempted to edit non-existent comment, error returned as expected.");
});

Deno.test("Action: deleteComment - Successfully deletes an existing comment", async (t) => {
    console.log("--- Test: deleteComment ---");

    const createResult = await commentingConcept.createComment({ user: userAlice, body: "Comment to delete.", item: itemPost1 });
    const commentId = createResult.comment as TestComment;
    console.log(`Created comment with ID: ${commentId}`);

    let allComments = await commentingConcept._getAllComments();
    assertEquals(allComments.length, 1, "There should be one comment before deletion.");

    const deleteResult = await commentingConcept.deleteComment({ comment: commentId });

    // effects: removes comment from Comments set
    assertEquals(deleteResult, {}, "Deleting a comment should return an empty object on success.");
    console.log(`Deleted comment with ID: ${commentId}`);

    allComments = await commentingConcept._getAllComments();
    assertEquals(allComments.length, 0, "There should be no comments after deletion.");
    console.log("Comment deletion verified successfully.");
});

Deno.test("Action: deleteComment - Fails to delete a non-existent comment", async (t) => {
    console.log("--- Test: deleteComment (non-existent) ---");
    const nonExistentComment = "comment:nonexistent" as TestComment;
    const result = await commentingConcept.deleteComment({ comment: nonExistentComment });

    // requires: comment exists
    assertEquals(result, { error: `Comment with ID ${nonExistentComment} not found.` }, "Should return an error for non-existent comment.");
    console.log("Attempted to delete non-existent comment, error returned as expected.");
});

Deno.test("Query: _getCommentsByAuthor - Returns comments by a specific author", async (t) => {
    console.log("--- Test: _getCommentsByAuthor ---");

    await commentingConcept.createComment({ user: userAlice, body: "Alice's comment 1.", item: itemPost1 });
    await commentingConcept.createComment({ user: userBob, body: "Bob's comment 1.", item: itemPost1 });
    await commentingConcept.createComment({ user: userAlice, body: "Alice's comment 2.", item: itemPost2 });
    console.log("Created multiple comments by Alice and Bob.");

    const aliceComments = await commentingConcept._getCommentsByAuthor({ author: userAlice });

    // effects: returns comments authored by user
    assertEquals(aliceComments.length, 2, "Should return 2 comments for Alice.");
    assertArrayIncludes(aliceComments.map(c => c.body), ["Alice's comment 1.", "Alice's comment 2."], "Alice's comments should be present.");
    console.log(`Found ${aliceComments.length} comments by Alice.`);

    const bobComments = await commentingConcept._getCommentsByAuthor({ author: userBob });
    assertEquals(bobComments.length, 1, "Should return 1 comment for Bob.");
    assertArrayIncludes(bobComments.map(c => c.body), ["Bob's comment 1."], "Bob's comment should be present.");
    console.log(`Found ${bobComments.length} comments by Bob.`);

    const nonExistentUser = "user:Charlie" as TestUser;
    const charlieComments = await commentingConcept._getCommentsByAuthor({ author: nonExistentUser });
    assertEquals(charlieComments.length, 0, "Should return 0 comments for a non-existent user.");
    console.log(`Found ${charlieComments.length} comments by Charlie (expected 0).`);
});

Deno.test("Query: _getCommentsByParent - Returns comments on a specific item", async (t) => {
    console.log("--- Test: _getCommentsByParent ---");

    await commentingConcept.createComment({ user: userAlice, body: "Comment on Post1 by Alice.", item: itemPost1 });
    await commentingConcept.createComment({ user: userBob, body: "Comment on Post1 by Bob.", item: itemPost1 });
    await commentingConcept.createComment({ user: userAlice, body: "Comment on Post2 by Alice.", item: itemPost2 });
    console.log("Created comments on Post1 and Post2.");

    const commentsOnPost1 = await commentingConcept._getCommentsByParent({ parent: itemPost1 });

    // effects: returns comments on parent
    assertEquals(commentsOnPost1.length, 2, "Should return 2 comments for Post1.");
    assertArrayIncludes(commentsOnPost1.map(c => c.body), ["Comment on Post1 by Alice.", "Comment on Post1 by Bob."], "Comments on Post1 should be present.");
    console.log(`Found ${commentsOnPost1.length} comments on Post1.`);

    const commentsOnPost2 = await commentingConcept._getCommentsByParent({ parent: itemPost2 });
    assertEquals(commentsOnPost2.length, 1, "Should return 1 comment for Post2.");
    assertArrayIncludes(commentsOnPost2.map(c => c.body), ["Comment on Post2 by Alice."], "Comment on Post2 should be present.");
    console.log(`Found ${commentsOnPost2.length} comments on Post2.`);

    const nonExistentItem = "item:NonExistent" as TestItem;
    const commentsOnNonExistent = await commentingConcept._getCommentsByParent({ parent: nonExistentItem });
    assertEquals(commentsOnNonExistent.length, 0, "Should return 0 comments for a non-existent item.");
    console.log(`Found ${commentsOnNonExistent.length} comments on non-existent item (expected 0).`);
});

Deno.test("Query: _getAllComments - Returns all comments in the database", async (t) => {
    console.log("--- Test: _getAllComments ---");

    await commentingConcept.createComment({ user: userAlice, body: "Comment 1.", item: itemPost1 });
    await commentingConcept.createComment({ user: userBob, body: "Comment 2.", item: itemPost1 });
    await commentingConcept.createComment({ user: userAlice, body: "Comment 3.", item: itemPost2 });
    console.log("Created 3 comments.");

    const allComments = await commentingConcept._getAllComments();

    // effects: returns all posts in db
    assertEquals(allComments.length, 3, "Should return all 3 comments.");
    assertArrayIncludes(allComments.map(c => c.body), ["Comment 1.", "Comment 2.", "Comment 3."], "All comment bodies should be present.");
    console.log(`Found ${allComments.length} total comments.`);
});

Deno.test("Principle Trace: User comments on an item and it becomes publically visible", async (t) => {
    console.log("--- Principle Trace ---");

    // Principle: A user views an item, a post or another comment, and wants to express an opinion on it.
    // They create and post a comment which is then publically visible and linked to that item.

    // 1. Simulate a user viewing an item (no action needed in this concept, just context)
    const viewingUser = userBob;
    const targetItem = itemPost1;
    const userCommentBody = "This is my opinion on the item!";
    console.log(`User ${viewingUser} views item ${targetItem}.`);

    // 2. User creates and posts a comment
    const createResult = await commentingConcept.createComment({ user: viewingUser, body: userCommentBody, item: targetItem });
    const newCommentId = createResult.comment as TestComment;
    assertNotEquals(newCommentId, undefined, "Comment creation should succeed.");
    console.log(`User ${viewingUser} creates comment ${newCommentId} on ${targetItem} with body: "${userCommentBody}".`);

    // 3. The comment is then publically visible and linked to that item
    // Verify visibility via _getAllComments
    const allComments = await commentingConcept._getAllComments();
    assertEquals(allComments.length, 1, "There should be one comment in the system.");
    assertEquals(allComments[0]._id, newCommentId, "The created comment should be found via _getAllComments.");
    assertEquals(allComments[0].author, viewingUser, "The author should match.");
    assertEquals(allComments[0].body, userCommentBody, "The body should match.");
    assertEquals(allComments[0].parent, targetItem, "The parent item should match.");
    console.log("Verified public visibility via _getAllComments.");

    // Verify linkage to the item via _getCommentsByParent
    const commentsOnTargetItem = await commentingConcept._getCommentsByParent({ parent: targetItem });
    assertEquals(commentsOnTargetItem.length, 1, `There should be one comment linked to item ${targetItem}.`);
    assertEquals(commentsOnTargetItem[0]._id, newCommentId, "The created comment should be found via _getCommentsByParent.");
    console.log(`Verified linkage to item ${targetItem} via _getCommentsByParent.`);

    // Verify linkage to the user via _getCommentsByAuthor
    const commentsByViewingUser = await commentingConcept._getCommentsByAuthor({ author: viewingUser });
    assertEquals(commentsByViewingUser.length, 1, `There should be one comment authored by user ${viewingUser}.`);
    assertEquals(commentsByViewingUser[0]._id, newCommentId, "The created comment should be found via _getCommentsByAuthor.");
    console.log(`Verified linkage to user ${viewingUser} via _getCommentsByAuthor.`);

    console.log("Principle trace successfully demonstrated: comment created, visible, and linked.");
});
