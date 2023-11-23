import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const elements = useSelector(store => store.elementList);
  const [newElement, setNewElement] = useState('');
  const planets = useSelector(store => store.planets);

  const getElements = () => {
    dispatch({type:"FETCH_ELEMENTS"});
  }

  const getPlanets = () => {
    dispatch({
      type: "FETCH_PLANETS"
    })
  }

  useEffect(() => {
    getElements();
    getPlanets();
  }, []);

  const addElement = () => {
    dispatch({
      type: "ADD_ELEMENT",
      payload: {name: newElement}
    });
    setNewElement("");
  }

  return (
    <div>
      <h1>Atomic Elements</h1>

      <ul>
        {elements.map(element => (
          <li key={element}>
            {element}
          </li>
        ))}
      </ul>

      <input 
        value={newElement} 
        onChange={evt => setNewElement(evt.target.value)} 
      />
      <button onClick={addElement}>Add Element</button>
      <h2>Planets</h2>
      <ul>
        {planets.map(planet => <li key={planet.name}>{planet.name}</li>)}
      </ul>
    </div>
  );
}

export default App;