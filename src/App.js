import logo from './logo.svg';
import './App.css';
import pbkdf2 from 'pbkdf2'
import MorfAccount from './lib'
import {buf2hex} from './utils'

function App() {
  // const phrase = MorfAccount.normalizePassphrase('passphrase')
  // const salt = "mnemonic" + phrase
  // var derivedKey = pbkdf2.pbkdf2Sync('password', salt, 2e5, 64 * 2, 'sha512')
  // console.log('derivedKey', derivedKey)
  // const hex = buf2hex(derivedKey)
  // console.log('hex', hex)

  const entropyStuff = MorfAccount.mnemonicToEntropy('wait walk verify vapor virus vicious', null)
  console.log('entropyStuff', entropyStuff)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
