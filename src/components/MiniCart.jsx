import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  makeStyles
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  removeIcon: {
    padding: "16px 7px",
    cursor: "pointer",
  }
}));

/**
 * Mini cart displaying list of products and option to remove.
 */
const MiniCart = ({ cart, cartChanger }) => {
  const classes = useStyles();
  
  const removeItem = (itemID) => {  
    let cartCopy = JSON.parse(localStorage.getItem("cart")) || [];
    cartCopy = cartCopy.filter(item => item.id != itemID);  
    cartChanger(cartCopy);
  }

  if(cart.length == 0) {
    return (
      <Box
        sx={{ width: "100%", minWidth: 360, padding: "15px", bgcolor: "background.paper" }}
      >Empty Cart</Box>
    )
  }

  return (
    <Box
      sx={{ width: "100%", minWidth: 360, bgcolor: "background.paper" }}
    >
      <List sx={{ width: "100%", maxWidth: 100 }}>
        {cart.map((item) => (
          <ListItem alignItems="flex-start" divider key={item.id} >
            <ClearIcon className={ classes.removeIcon } onClick={() => {
              removeItem(item.id);
            }}/>
            <ListItemText
              primary={item.title}
              secondary={item.currency + item.price}
            />
            <ListItemText
              primary={`Qty ${item.quantity}`}
            />
          </ListItem>
        ))}
      </List></Box>
  );
};

MiniCart.propTypes = {
  cart: PropTypes.array,
  cartChanger: PropTypes.func
}

export default MiniCart;
