# ThisDot Movie Search

## Exercise

### Highlight something in your project that you thought was especially interesting or significant to your overall implementation.

- Added login page, to get and store auth token on login (use any username/password to simulate login)
- Architecture ased on the APIs, query string params and their return types.
- Update the UI/UX, DaisyUI, React Query.
- Refactored pagination, more simple.
- I add a Netflix style scroll for the movie poster.

### Tell us what you are most pleased or proud of with your implementation.

- Updated UI/UX using DaisyUI, dark/light mode.
- Axios/React Query based service component.
- Login/auth page to set the authToken with a simulated login.

### Given more time, what next feature or improvement would you like to add to your project?

- More error handling.
- Better loading component placement.
- Improve Movie Details modal design/layout.
- More responsive and mobile testing.
- Add TypeScript. (.jsx files originally to deliver faster, small app and only developer)
- Performance optimization (refactor some components, memo/callback?, track re-renders, React Profiler)
- Add Unit tests.
- Additional filtering/functionality.

Minimum Requirements As a user,

- I can search for movies and see a paginated list of results
- I can filter search results by genre
- I can navigate through the next and previous pages of the paginated results
- I see the total count of search results
- I see notable information for each search result, such as the summary, poster, duration, rating, etc.

The app should utilize the REST or GraphQL API provided by our Movies API. The documentation for utilizing this API can be found at https://github.com/thisdot/movies-api. The base URL for the API is https://0kadddxyh3.execute-api.us-east-1.amazonaws.com.

## APIs

API Limitations _total movie count requires extra REST call with page size = 1, limit = 1000, i.e. totalPages _ pageSize != accurate result count\* _genre list requires extra REST call to get all genre types e.g. /genre/movies returns genres with movie array_ _query param take one Genre in querystring, could not combine multiple genres for a true filter_

GET /auth/token: Fetch a valid token to be used in the queries below GET /healthcheck: Check status of the app GET /genres/movies: Fetch a list of all movie IDs grouped by genre Query Parameters: page: the page number to be fetched, starting at page 1 (default = 1) limit: the number of items per page (default = 25) GET /movies: Fetch a list of all movies Query Parameters: page: the page number to be fetched, starting at page 1 (default = 1) limit: the number of items per page (default = 25) search: searches for a movie title (simple string match in the whole title string) genre: searches for a movie genre (exact match) GET /movies/{id}: Fetch details of a specific movie GET /movies/titles: Fetch a list of all movie IDs and titles Query Parameters: page: the page number to be fetched, starting at page 1 (default = 1) limit: the number of items per page (default = 25) GET /movies/genres/{id}: Fetch stats details of a movie genre
