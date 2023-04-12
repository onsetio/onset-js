import './App.css';

function App() {
  const onClick = (action) => {
    switch (action) {
      case 'show':
        window.onsetWidget.show();
        break;
      case 'hide':
        window.onsetWidget.hide();
        break;
      case 'toggle':
        window.onsetWidget.toggle();
        break;
      default:
        break;
    }   
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => onClick('show')}>Show Widget</button>
        <button onClick={() => onClick('hide')}>Hide Widget</button>
        <button onClick={() => onClick('toggle')}>Toggle Widget</button>
      </header>
    </div>
  );
}

export default App;
