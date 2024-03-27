import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedEffects, setSelectedEffects] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [description, setDescription] = useState('');
  const [topStrains, setTopStrains] = useState([]);

  const effects = [
    'Aroused', 'Creative', 'Dry', 'Energetic', 'Euphoric', 'Focused', 'Giggly',
    'Happy', 'Hungry', 'Mouth', 'None', 'Relaxed', 'Sleepy', 'Talkative', 'Tingly', 'Uplifted'
  ];

  const flavors = [
    'Ammonia', 'Apple', 'Apricot', 'Berry', 'Blue', 'Blueberry', 'Butter', 'Cheese', 'Chemical',
    'Chestnut', 'Citrus', 'Coffee', 'Diesel', 'Earthy', 'Flowery', 'Fruit', 'Grape', 'Grapefruit',
    'Honey', 'Lavender', 'Lemon', 'Lime', 'Mango', 'Menthol', 'Mint', 'Minty', 'None', 'Nutty',
    'Orange', 'Peach', 'Pear', 'Pepper', 'Pine', 'Pineapple', 'Plum', 'Pungent', 'Rose', 'Sage',
    'Skunk', 'Spicy/Herbal', 'Strawberry', 'Sweet', 'Tar', 'Tea', 'Tobacco', 'Tree', 'Tropical',
    'Vanilla', 'Violet', 'Woody'
  ];

  const types = ['Indica', 'Hybrid', 'Sativa'];

  const handleEffectChange = (effect) => {
    setSelectedEffects((prevEffects) => {
      if (prevEffects.includes(effect)) {
        return prevEffects.filter((e) => e !== effect);
      } else {
        return [...prevEffects, effect];
      }
    });
  };

  const handleFlavorChange = (flavor) => {
    setSelectedFlavors((prevFlavors) => {
      if (prevFlavors.includes(flavor)) {
        return prevFlavors.filter((f) => f !== flavor);
      } else {
        return [...prevFlavors, flavor];
      }
    });
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) => {
      if (prevTypes.includes(type)) {
        return prevTypes.filter((t) => t !== type);
      } else {
        return [...prevTypes, type];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://StrainerServiceLB-1153351773.us-east-1.elb.amazonaws.com/recommend', {
        effects: selectedEffects,
        flavors: selectedFlavors,
        types: selectedTypes,
        description: description,
      });
      setTopStrains(response.data.top_strains);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app">
      <h1>Strain Recommender</h1>
      <form onSubmit={handleSubmit}>
        <div className="options-container">
          <div className="option-group">
            <label>Effects:</label>
            {effects.map((effect) => (
              <div key={effect} className="option-item">
                <input
                  type="checkbox"
                  id={`effect-${effect}`}
                  checked={selectedEffects.includes(effect)}
                  onChange={() => handleEffectChange(effect)}
                />
                <label htmlFor={`effect-${effect}`}>{effect}</label>
              </div>
            ))}
          </div>
          <div className="option-group">
            <label>Flavors:</label>
            {flavors.map((flavor) => (
              <div key={flavor} className="option-item">
                <input
                  type="checkbox"
                  id={`flavor-${flavor}`}
                  checked={selectedFlavors.includes(flavor)}
                  onChange={() => handleFlavorChange(flavor)}
                />
                <label htmlFor={`flavor-${flavor}`}>{flavor}</label>
              </div>
            ))}
          </div>
          <div className="option-group">
            <label>Type:</label>
            {types.map((type) => (
              <div key={type} className="option-item">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                />
                <label htmlFor={`type-${type}`}>{type}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Get Recommendations</button>
      </form>
      {topStrains.length > 0 && (
        <div>
          <h3>Top Recommended Strains:</h3>
          <ul>
            {topStrains.map((strain, index) => (
              <li key={index}>{strain}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;