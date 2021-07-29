import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [foodName, setFoodName] = useState('');
  const [days, setDays] = useState(0);
  const [list, setList] = useState([]);
  const [newFood, setNewFood] = useState('');

  const getItems = () => {
    Axios.get('http://localhost:3001/read').then((res) => {
      setList(res.data);
    });
  };
  const apiCallBack=(type, path)=>{
    console.log("Hello Api");
  }

  useEffect(() => {
    getItems();
  }, []);
  const addToList = async () => {
    await Axios.post('http://localhost:3001/insert', { foodName: foodName, days: days });
    getItems();
  };
  const updateFood = async (id) => {
    await Axios.put('http://localhost:3001/update', { id: id, newFood: newFood });
    getItems();
  };

  const deleteFood = async(id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`);
    getItems();
  };
  return (
    <>
      <div className="App">
        <h1> CRUD App with MERN</h1>
        <label>Food Name</label>
        <input
          type="text"
          onChange={(event) => {
            setFoodName(event.target.value);
          }}
        />
        <label>Days since you ate eat?</label>
        <input
          type="number"
          onChange={(event) => {
            setDays(event.target.value);
          }}
        />
        <button type="submit" onClick={addToList}>
          Add to List
        </button>
        <h1>Food List</h1>
        {list.map((val, key) => {
          return (
            <div className="food" key={key}>
              <h3>{val.foodName}</h3>
              <h3>{val.daysSinceIAte}</h3>
              <input
                type="text"
                placeholder="New Food Name..."
                onChange={(event) => {
                  setNewFood(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateFood(val._id);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  deleteFood(val._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
