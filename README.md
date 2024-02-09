# GitHub API Tester
### with React + TypeScript + Vite

This project implements the technical specifications outlined in [AR - Technical Test.pdf](AR - Technical Test.pdf). It allows users to search GitHub for either a username or an organization, and returns all the repositories for the given criteria. Results can be sorted in all ways supported by the API. Note that at this time, sort must be defined BEFORE submitting a search, since pagination is server-side.

## To Run

1. Clone repository
2. Ensure Node, npm, and nvm are installed
3. From the project root, run `nvm use`
4. Install packages with `npm i` (use `--no-bin-links` for wsl)
5. Run with `npm run dev` and visit http://127.0.0.1:5173/ to see the page.

## Technical Notes

- An `.nvmrc` file is included for quick engine matching before installation.
- Symlinks don't work on WSL, so yarn will complain - hence the decision to use npm.
- Created with Vite because `create-react-app` is deprecated as of 2023.
- Bootstrap CSS/JS and SCSS support added for quick styling.
- Header links parsed with an open-src function.
- GitHub's `Octokit` package used to easily interact with API.

## Needed Improvements
- Styling is still a bit funky in certain areas, particularly surrounding the dropdown and table areas.
- The ability to sort results by clicking table headers would be really nice.
- Refactoring to break up large components like `ControlledForm` and `ResultsTable` is needed.
- Refactoring of component heirarchy could be useful, since the results table really probably shouldn't be a child of the search form, but is currently included as such because elevating the results state would have been more time-consuming.
- Adding authentication for users to access their own private repositories would be nice.
