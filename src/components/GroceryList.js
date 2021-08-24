import React, { useContext } from "react";
import { GroceryListContext } from "./context";
import Item from "./Item";

function GroceryList() {
  const { groceryList } = useContext(GroceryListContext);

  return (
    <div>
      {groceryList.map((item) => (
        <Item item={item} key={item._id} />
      ))}
    </div>
  );
}

export default GroceryList;
