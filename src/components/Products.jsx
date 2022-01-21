import React, { useState, useEffect } from "react";
import UpdateCart from "./UpdateCart";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles
} from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  price: {
    textAlign: "right",
    padding: "15px",
  }
}));

/**
 * Component to display list of products
 */
function Products ({ cart, cartChanger }) {
  const [data, setData] = useState(null);
  const classes = useStyles();
        
  useEffect(() => {
    const url = "http://dnc0cmt2n557n.cloudfront.net/products.json";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.products);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="products" >
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {data && data.map((item) => (
          <ListItem alignItems="flex-start" key={item.id} id={`prod-${item.id}`} divider>
            <ListItemAvatar>
              <Avatar><CategoryIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              secondary={
                <>
                  {item.desc}
                </>
              }
            />
            <UpdateCart product={item} cart={cart} cartChanger={cartChanger} />
            <ListItemText
              primary={item.currency + item.price}
              className={ classes.price }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

Products.propTypes = {
  cart: PropTypes.array,
  cartChanger: PropTypes.func
}

export default Products