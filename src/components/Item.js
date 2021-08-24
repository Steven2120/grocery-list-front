import React, { useContext, useState } from "react";
import { GroceryListContext } from "./context";

function Item({ item }) {
  const { deleteGrocery, purchaseGrocery, sortFunc } =
    useContext(GroceryListContext);

  const [canEdit, setCanEdit] = useState(false);
  const [updateValue, setUpdateValue] = useState(item.grocery);

  function handleUpdateSubmit(id, item, updatedValue) {
    setCanEdit(!canEdit);
    purchaseGrocery(id, item, false, updatedValue);
  }

  return (
    <div key={item._id}>
      {canEdit ? (
        <input
          value={updateValue}
          onChange={(e) => setUpdateValue(e.target.value)}
        />
      ) : (
        <span style={{ textDecoration: item.purchased && "line-through" }}>
          {" "}
          {item.grocery}
        </span>
      )}

      <button onClick={() => deleteGrocery(item._id)}>Delete</button>
      <button onClick={() => purchaseGrocery(item._id, item, true)}>
        Purchased
      </button>

      {canEdit ? (
        <button onClick={() => handleUpdateSubmit(item._id, item, updateValue)}>
          Submit Update
        </button>
      ) : (
        <button onClick={() => setCanEdit(!canEdit)}>Edit</button>
      )}

      <button onClick={() => sortFunc("asc")}>Asc</button>
      <button onClick={() => sortFunc("desc")}>Des</button>
    </div>
  );
}

export default Item;
