# ThisDot Movie Search

## ToDo

- Better design/layout, chose a basic layout until fully functional
- UI component library. Did not use library to keep simple and demonstrate skills, shadcn/ui added unwanted complexity for exercise but I ususally install a UI library for a full featured app.
- Convert to TypeScript (original plan to add Three.js animations)
- Configure env file for better deployments, apis, etc.
- Use react query (caching, etc.)
- Use filters (checkboxes) on left side or slide out panel.
- Add error handling (try/catch, AbortController, error boundries)
- Smaller components, will require more complete state mangement to avoid prop drilling (zustand possibly)
- Better loading indicator (animation)
- Add more responsive cases
- Add accessibility
- Test more edge cases (missing data, poster sizes, etc.)
- Randomize ken burns style animation, slower

## Exercise

### Highlight something in your project that you thought was especially interesting or significant to your overall implementation.
- I wanted to build this simple but effective and used as little state as possible (refs).
- Based on the APIs and their return types, I wanted to make the minimum API calls required. 
- GraphQL may be the better choice here but my limited experience with GraphQL would require additional development time.
- I created my own base UI components to demonstrate concepts (as opposed to UI component library). 

### Tell us what you are most pleased or proud of with your implementation.
- I was pleased with my custom pagination component. 
- I explored using the Shadcn/ui component library but UI library became overly complex for this exercise. e.g. the shadcn Form component requires react-hook-form and zod.
- I would typically leverage a UI component library that is compatible with overall design, architecture and goals of the project. 

### Given more time, what next feature or improvement would you like to add to your project?
My initial approach was to work according to the API fetch and responses functionality e.g. /movies returns an array of movies using querystring parameters as opposed to filtering the result set, I used a select component to filter (one genre) rather than checkboxes (multiple genre).

Given more time, I would like to:
- Improve the UI layout/design.
- Add accessibility
- Improve state management to track UI state and prevent excessive prop drilling. 
- Refactor the main Movies component into smaller, more composable components (along with the state management)


Minimum Requirements As a user, 
- I can search for movies and see a paginated list of results 
- I can filter search results by genre 
- I can navigate through the next and previous pages of the paginated results 
- I see the total count of search results 
- I see notable information for each search result, such as the summary, poster, duration, rating, etc.

The app should utilize the REST or GraphQL API provided by our Movies API. The documentation for utilizing this API can be found at https://github.com/thisdot/movies-api. The base URL for the API is https://0kadddxyh3.execute-api.us-east-1.amazonaws.com.

## APIs

API Limitations
*total movie count requires extra REST call with page size = 1, limit = 1000, i.e. totalPages * pageSize != accurate result count*
*genre list requires extra REST call to get all genre types e.g. /genre/movies returns genres with movie array*
*query param take one Genre in querystring, could not combine multiple genres for a true filter*

GET /auth/token: Fetch a valid token to be used in the queries below
GET /healthcheck: Check status of the app
GET /genres/movies: Fetch a list of all movie IDs grouped by genre Query Parameters: page: the page number to be fetched, starting at page 1 (default = 1) limit: the number of items per page (default = 25)
GET /movies: Fetch a list of all movies Query Parameters: page: the page number to be fetched, starting at page 1 (default = 1) limit: the number of items per page (default = 25) search: searches for a movie title (simple string match in the whole title string) genre: searches for a movie genre (exact match)
GET /movies/{id}: Fetch details of a specific movie
GET /movies/titles: Fetch a list of all movie IDs and titles Query Parameters: page: the page number to be fetched, starting at page 1 (default = 1) limit: the number of items per page (default = 25)
GET /movies/genres/{id}: Fetch stats details of a movie genre
