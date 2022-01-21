import React, { useState } from "react";
import MiniCart from "./MiniCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import "../App.css";

const getCartTotal = (cart) => {
  const totalItems = cart.reduce((sum, { quantity }) => sum + quantity, 0 );
  const cartTotal = cart.reduce((sum, { price, quantity }) => sum + (price * quantity), 0 );
  return [cartTotal, totalItems];
}

/**
 * Header component showing the total & number of items added in the cart
 */
function Header ({cart, cartChanger}) {
  const [cartTotal, totalItems] = getCartTotal(cart);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if(totalItems > 0)
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
    
  return (
    <div className="headerContainer">
      <div className="leftMenu">
        <h4>Products</h4>
      </div>
      <div className="rightMenu">
        <div className="cartItems">
          <Button variant="text" onClick={handleClick}>
            {totalItems > 1 ? `${totalItems} items` : `${totalItems} item`}
            <ShoppingCartIcon />{" "}
          </Button>
        </div>
        {totalItems > 0 && 
                        <div className="cartTotal">${cartTotal}</div>    
        }
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MiniCart cart={cart} cartChanger={cartChanger} />
      </Popover>
    </div>
  );
}

Header.propTypes = {
  cart: PropTypes.array,
  cartChanger: PropTypes.func
}

export default Header