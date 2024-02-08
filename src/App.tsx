import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import { ControlledForm } from './Form';


/* TODO: break api calls into separate functions, single call each.
let user indicate org or user in form. then can use server side pagination. */

function App() {

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>GitHub API Test</h1>
      <ControlledForm />
    </>
  )
}

export default App
