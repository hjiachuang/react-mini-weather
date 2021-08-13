import './App.css';
import ReactMiniWeather from './lib'

function App() {
  return (
    <div className="App">
      <div className="one">
        <pre>size:small;    type:oneline;   color: 000000;</pre>
        <div className="weather">
          <ReactMiniWeather size="small" type="oneline" color="000000" />
        </div>
      </div>
      <div className="two">
        <pre>size:normal; type:oneline; color: f5af19;</pre>
        <div className="weather">
          <ReactMiniWeather size="normal" type="oneline" color="f5af19" />
        </div>
      </div>
      <div className="three">
        <pre>size:small; type:multiline; color: 99f2c8;</pre>
        <div className="weather">
          <ReactMiniWeather size="small" type="multiline" color="99f2c8" />
        </div>
      </div>
      <div className="four">
        <pre>size:normal; type:multiline; color: ffffff;</pre>
        <div className="weather">
          <ReactMiniWeather size="normal" type="multiline" color="ffffff" />
        </div>
      </div>
    </div>
  );
}

export default App;
