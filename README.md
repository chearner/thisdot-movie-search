# ThisDot Movie Search

README, please include details about the following: ○ Highlight something in your project that you thought was especially interesting or significant to your overall implementation. ○ Tell us what you are most pleased or proud of with your implementation. ○ Given more time, what next feature or improvement would you like to add to your project?

Minimum Requirements As a user, ● I can search for movies and see a paginated list of results ● I can filter search results by genre ● I can navigate through the next and previous pages of the paginated results ● I see the total count of search results ● I see notable information for each search result, such as the summary, poster, duration, rating, etc.

The app should utilize the REST or GraphQL API provided by our Movies API. The documentation for utilizing this API can be found at https://github.com/thisdot/movies-api. The base URL for the API is https://0kadddxyh3.execute-api.us-east-1.amazonaws.com.

GET /auth/token: Fetch a valid token to be used in the queries below

GET /healthcheck: Check status of the app

GET /genres/movies: Fetch a list of all movie IDs grouped by genre Query Parameters: page: the page number to be fetched, starting at page 1 (default = 1) limit: the number of items per page (default = 25)

GET /movies: Fetch a list of all movies Query Parameters: page: the page number to be fetched, starting at page 1 (default = 1) limit: the number of items per page (default = 25) search: searches for a movie title (simple string match in the whole title string) genre: searches for a movie genre (exact match)

GET /movies/{id}: Fetch details of a specific movie

GET /movies/titles: Fetch a list of all movie IDs and titles Query Parameters: page: the page number to be fetched, starting at page 1 (default = 1) limit: the number of items per page (default = 25)

GET /movies/genres/{id}: Fetch stats details of a movie genre
