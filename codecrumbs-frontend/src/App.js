import logo from './logo.svg';
import ItemBox from './ItemBox'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Code Crumbs</h1>
      <ItemBox title="Stack Overflow" description="https://stackoverflow.com.questions..."/>
      <ItemBox title="Stack Overflow" description="https://stackoverflow.com.questions..."/>
      <ItemBox title="Stack Overflow" description="https://stackoverflow.com.questions..."/>
    </div>
  );
}

export default App;
