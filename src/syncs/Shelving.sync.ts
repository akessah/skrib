// These two help you declare synchronizations
import { actions, Sync } from "@engine";
// Choose whatever concepts you have. Assuming PostingConcept and CommentingConcept
// are available and have the necessary actions/queries based on the spec and examples.
import { Requesting, Shelving, Sessioning } from "@concepts";

//Add book
export const AddBookRequest: Sync = (
  { request, user, status, book, session },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Shelving/addBook", status, book, session },
    { request },
  ]),
  where: async (frames) => {
        return await frames.query( Sessioning._getUser, { session }, { user });
    },
  then: actions([Shelving.addBook, {
    user,
    status,
    book
  }]),
});

export const AddBookSuccessResponse: Sync = (
  { request, shelf },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/addBook", }, { request }, ],
    [Shelving.addBook, {}, {shelf}]
  ),
  then: actions([Requesting.respond, {
    request,
    shelf,
  }]),
});

export const AddBookFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/addBook", }, { request }, ],
    [Shelving.addBook, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});

//Remove book
export const RemoveBookRequest: Sync = (
  { request, shelf, session, user, owner },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Shelving/removeBook", shelf, session },
    { request },
  ]),
  where: async (frames) => {
        frames = await frames.query( Sessioning._getUser, { session }, { user });
        frames = await frames.query(Shelving._getShelfOwner, { shelf }, { owner });
        return frames.filter(($) => $[owner] == $[user]);
    },
  then: actions([Shelving.removeBook, {
    shelf
  }]),
});

export const RemoveBookSuccessResponse: Sync = (
  { request, },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/removeBook", }, { request }, ],
    [Shelving.removeBook, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Book successfully removed from shelf",
  }]),
});

export const RemoveBookFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/removeBook", }, { request }, ],
    [Shelving.removeBook, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});

//Change status
export const ChangeStatusRequest: Sync = (
  { request, shelf, newStatus, session, user, owner },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Shelving/changeStatus", shelf, newStatus, session },
    { request },
  ]),
  where: async (frames) => {
        frames = await frames.query( Sessioning._getUser, { session }, { user });
        frames = await frames.query(Shelving._getShelfOwner, { shelf }, { owner });
        return frames.filter(($) => $[owner] == $[user]);
    },
  then: actions([Shelving.changeStatus, {
    shelf, newStatus
  }]),
});

export const ChangeStatusSuccessResponse: Sync = (
  { request },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/changeStatus", }, { request }, ],
    [Shelving.changeStatus, {}, {}]
  ),
  then: actions([Requesting.respond, {
    request,
    status: "Successfully changed book's shelf",
  }]),
});

export const ChangeStatusFailureResponse: Sync = (
  { request, error },
) => ({
  when: actions([Requesting.request, { path: "/Shelving/changeStatus", }, { request }, ],
    [Shelving.changeStatus, {}, {error}]
  ),
  then: actions([Requesting.respond, {
    request,
    error,
  }]),
});
