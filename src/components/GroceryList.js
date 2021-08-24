import React, { useContext } from "react";
import { GroceryListContext } from "./context";
import Item from "./Item";

function GroceryList() {
  const { groceryList } = useContext(GroceryListContext);
  console.log(groceryList);
  return (
    <div>
      {groceryList.map((item) => {
        return <Item item={item} key={item._id} />;
      })}
    </div>
  );
}

export default GroceryList;
