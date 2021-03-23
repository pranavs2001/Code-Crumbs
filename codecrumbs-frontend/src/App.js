import logo from './logo.svg';
import ItemBox from './ItemBox'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Code Crumbs</h1>
      <ItemBox title="Stack Overflow" onCommentSubmit={handleChange} isCurrent/>
      <ItemBox title="Stack Overflow" comment="https://stackoverflow.com.questions..."/>
      <ItemBox title="Stack Overflow" />
    </div>
  );
}

function handleChange(text) {
  alert(text)
}

export default App;
