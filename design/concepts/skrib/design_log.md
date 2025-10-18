# Design Log for Skrib
A concept by concept breakdown of what happened

## Posting
### Concept specification
- Mostly same as assignment 2
- Created queries to get all posts by a specific user and get all posts in the database

### Concept implementation
- wrote Posting.ts by hand, going based of the structure introduced in class and the LikertSurvey implementation example

## Testing
- Used Gemini 2.5 flash to generate tests
- had to include --allow-read --allow-net --allow-env --allow-sys flags to run tests
- had to reset database every step for assertions to be correct (every step test would assume it's getting a fresh database). used posts.drop()
- changed posting concept to make posts a private field, removing rep exposure and channeling my inner 6.102
- Gemini did mess up a return type, causing a test to fail, but it was resolved and all tests passed

# Notifying
### Concept spec
- added read flag to notification
- added read action that sets flag to true
- added queries get notifications by user, get read/unread notifications by user, get all notifications

### implementation
- did by hand, similar to posting

### testing
- Used Gemini 2.5 flash to generate tests
- First run wasn't doing robust type checking, causing errors, had Gemini fix
- again, had to create new database for each test
- then, all tests passed

# Upvoting
### Concept spec
- added queries get votes from user, get votes on an item, get all votes

### implementation
- did by hand, similar to posting

### testing
- Used Gemini 2.5 flash to generate tests
- this time, included statement in prompt to open and close new database for each test, Gemini instead created tests so that they depend on each other
- operating priniciple test was still isolated, so had to manually open and close db for that test
- after doing so, whole suite passed


## Posting
### Concept specification
- Mostly same as assignment 2
- Created queries to get all comments by a specific user, get all 1st level comments of a post, get tree of comments under a post, and get all posts in the database

### Concept implementation
- wrote Posting.ts by hand, going based of the structure introduced in class and the LikertSurvey implementation example

## Testing
- Used Gemini 2.5 flash to generate tests
- had to include --allow-read --allow-net --allow-env --allow-sys flags to run tests
- had to reset database every step for assertions to be correct (every step test would assume it's getting a fresh database). used posts.drop()
- changed posting concept to make posts a private field, removing rep exposure and channeling my inner 6.102
- Gemini did mess up a return type, causing a test to fail, but it was resolved and all tests passed


# Authenticate
### Concept spec
- originally kept identical to assignment 2, was uncertain if it should be changed for actual use
- went to office hours, was told spec was ok and connecting it to a service will be covered next week
- added queries to get users

### implementation
- did by hand, similar to posting

### testing
- Used Gemini 2.5 flash to generate tests
- This time added an afterAll callback to tests to close db
- realized afterAll probably refers to tests, not steps, so still wasn't working
- tests for the most part were connected, so just needed to add to end
- had to open and close new db for principle test since I decided to make users field private
- after those minor changes (~4 lines), all tests passed
- for future: probably should separate isolated steps into different suites for organization purposes

# Commenting
### Concept spec
- originally had commenting separate from posing in assignment 2
- combined in assignment three, honestly because ai augmentation depended on sync
- will go back to separate concepts for this and future assignments
- very similar to posting

### implementation
- did by hand, almost identical to posting, so copy and paste

### testing
- Used Gemini 2.5 flash to generate tests
- first test suite had weird type error from incorrect import and type declaration, had Gemini fix
- Gemini "fix" created same error
- Realized most of the problems stemmed from having one big Deno test function with a bunch of steps; refactored to instead just have multiple Deno test functions; before each now also works
- all tests passed
