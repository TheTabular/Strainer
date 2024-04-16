import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

function App() {
  const [selectedEffects, setSelectedEffects] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [topStrains, setTopStrains] = useState([]);
  const [showTopStrains, setShowTopStrains] = useState(false);

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
      const response = await axios.post('https://api.strainer.wiki/recommend', {
        effects: selectedEffects,
        flavors: selectedFlavors,
        types: selectedTypes,
      });
      setTopStrains(response.data.top_strains.slice(0, 5)); // Get the top 5 strains
      setShowTopStrains(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (topStrains.length > 0) {
      // Scroll to the bottom of the page when top strains are loaded
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [topStrains]);

  return (
    <div className="app">
      <h1>Strain Recommender</h1>
      <form onSubmit={handleSubmit}>
        <div className="options-container">
          <div className="option-group">
            <label className="option-header">Type</label>
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
          <div className="option-group">
            <label className="option-header">Effects</label>
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
            <label className="option-header">Flavors</label>
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
        </div>
      </form>
      <div className="button-container">
        <button type="button" className="recommendation-button" onClick={handleSubmit}>
          Get Recommendations
        </button>
      </div>
      {showTopStrains && (
        <div className="top-strains">
          <h2>Top 5 Recommended Strains</h2>
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