import React, { useState, useEffect } from "react";
import axios from "axios";
import GroceryInput from "./components/GroceryInput";
import GroceryList from "./components/GroceryList";

import { GroceryInputContext, GroceryListContext } from "./components/context";

import "./App.css";

function App() {
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    fetchAllGrocery();
  }, []);

  async function fetchAllGrocery() {
    try {
      let result = await axios.get(
        "http://localhost:8080/api/grocery/get-all-groceries"
      );

      setGroceryList([result.data]);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteGrocery(id) {
    try {
      let result = await axios.delete(
        `http://localhost:8080/api/grocery/delete-grocery-by-id/${id}`
      );

      let filteredArray = groceryList.filter(
        (item) => item._id !== result.data._id
      );

      setGroceryList(filteredArray);
    } catch (e) {
      console.log(e);
    }
  }

  async function purchaseGrocery(
    id,
    item,
    didUpdate = null,
    updateValue = null
  ) {
    if (didUpdate) {
      item.purchased = !item.purchased;
    }

    if (updateValue) {
      item.grocery = updateValue;
    }

    try {
      let result = await axios.put(
        `http://localhost:8080/api/grocery/update-grocery-by-id/${id}`,
        item
      );

      let newArray = groceryList.map((item) => {
        if (item._id === id) {
          item.grocery = result.data.grocery;
          item.purchased = result.data.purchased;
        }
        return item;
      });

      setGroceryList(newArray);
    } catch (e) {
      console.log(e);
    }
  }

  async function sortFunc(sortOrder) {
    //write logic here to sort

    if (sortOrder === "asc") {
      let sortedArray = groceryList.sort(
        (a, b) => Date.parse(a.Date) - Date.parse(b.Date)
      );

      let newArray = [...sortedArray];

      setGroceryList(newArray);
    }

    if (sortOrder === "desc") {
      let sortedArray = groceryList.sort(
        (a, b) => Date.parse(b.Date) - Date.parse(a.Date)
      );

      let newArray = [...sortedArray];

      setGroceryList(newArray);
    }
  }

  return (
    <div className="App">
      <GroceryInputContext.Provider
        value={{
          groceryList,
          setGroceryList,
        }}
      >
        <GroceryInput />
      </GroceryInputContext.Provider>

      <GroceryListContext.Provider
        value={{
          groceryList,
          deleteGrocery,
          purchaseGrocery,
          sortFunc,
        }}
      >
        <GroceryList />
      </GroceryListContext.Provider>
    </div>
  );
}

export default App;
