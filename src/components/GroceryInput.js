import axios from "axios";
import React, { useState, useContext } from "react";
import { GroceryInputContext } from "./context";

function GroceryInput() {
  const { groceryList, setGroceryList } = useContext(GroceryInputContext);
  const [grocery, setGrocery] = useState("");

  async function handleGrocerySubmit(e) {
    e.preventDefault();
    try {
      let result = await axios.post(
        "http://localhost:3001/api/grocery/create-grocery",
        {
          grocery,
        }
      );

      let newArray = [...groceryList, result.data];

      setGroceryList(newArray);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleGrocerySubmit}>
      <h1>Grocery List</h1>
      <input type="text" onChange={(e) => setGrocery(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default GroceryInput;
