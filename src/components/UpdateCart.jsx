import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  textField: {
    width : "40px",
  },
  buttonGroup: {
    marginTop: "10px",
  }
}));

// quantity to show in product listing
const itemCountFromCart = (cart, id) => {
  let item = cart.find(item => item.id == id);
  return item ? item.quantity : 0;
}

/**
 * Component to update quantity in cart by adding or removing products
 */
function UpdateCart ({product, cart, cartChanger}) {
  const {id, price, title, currency} = product;
  const itemCount = itemCountFromCart(cart, id);	
  const classes = useStyles();

  // Add item in cart
  const addItem = (itemCount) => {		
    let cartCopy = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cartCopy.find(item => item.id == id);
    if (existingItem) {
      existingItem.quantity = itemCount + 1;
    } else {
      cartCopy.push({id: id, title: title, currency: currency, price: price, quantity: itemCount + 1})
    }
    cartChanger(cartCopy);
  }

  // Remove item from cart
  const removeItem = (itemCount) => {  
    let cartCopy = JSON.parse(localStorage.getItem("cart")) || [];
    let existentItem = cartCopy.find(item => item.id == id);
    if (!existentItem) return
    existentItem.quantity = Math.max(itemCount - 1, 0)
    if (existentItem.quantity <= 0) {
      cartCopy = cartCopy.filter(item => item.id != id)
    }				
    cartChanger(cartCopy);
  }

  return (
    <ButtonGroup className={ classes.buttonGroup }>
      <Button id="removeButton"
        onClick={() => {
          removeItem(itemCount);
        }}
      >			
        <RemoveIcon fontSize="small" />
      </Button>
      <TextField
        value={itemCount}
        size="small"
        inputProps={{ className: classes.textField }}
        color="primary"
      />
      <Button id="addButton"
        onClick={() => {
          addItem(itemCount);
        }}
      >		
        <AddIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  )
}

UpdateCart.propTypes = {
  product: PropTypes.object,
  cart: PropTypes.array,
  cartChanger: PropTypes.func
}

export default UpdateCart;