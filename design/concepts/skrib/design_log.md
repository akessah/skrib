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
