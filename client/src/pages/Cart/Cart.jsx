/** @format */

import BoxContainer from 'components/common/BoxContainer/BoxContainer';
import './cart.scss';

import Button from 'components/common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from 'components/common/Box/Box';
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';
import { addArrProductToCart } from 'store/cart';

const Cart = props => {
  document.title = `Cart | ofwood`;
  const dispatch = useDispatch();
  const updateUser = useUpdateUserRedux();
  const loggedIn = useSelector(state => state.loggedIn.loggedIn);
  const cart = useSelector(state => state.cart.cart);
  const [cartProducts, setCartProduct] = useState([]);
  const [price, setPrice] = useState();
  let renderPolices = true;
  if (props.polices) renderPolices = props.polices == 'true';
  useEffect(() => {
    if (!loggedIn && cart.length > 0) {
      (async () => {
        try {
          let cartArr = JSON.parse(JSON.stringify(cart));
          cartArr = cartArr.map(product => product.product_id);
          const { data } = await axios.post('/v1/products/cart', {
            _id: cartArr,
          });
          cartArr = JSON.parse(JSON.stringify(cart));
          cartArr.map(product => {
            for (let doc of data.data.doc) {
              if (doc._id == product.product_id) {
                return (product.product_id = doc);
              }
            }
          });
          setCartProduct(cartArr);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      setCartProduct(cart);
    }
  }, []);
  // total price
  useEffect(() => {
    if (cartProducts.length > 0) {
      let total = 0;
      for (let product of cartProducts) {
        total += product.price * product.quantity;
      }
      setPrice(total);
    }
  }, [cartProducts]);
  //
  useEffect(() => {
    if (loggedIn) {
      setCartProduct(cart);
    }
  }, [cart]);
  const handleDeleteProduct = indx => () => {
    if (loggedIn) {
      (async () => {
        try {
          let cartArr = JSON.parse(JSON.stringify(cart));
          cartArr.splice(indx, 1);
          let { data } = await axios.patch('/v1/users/updateme', {
            cart: cartArr,
          });
          updateUser(data.data.token);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      let cartLocal = JSON.parse(localStorage.getItem('cart'));
      cartLocal.splice(indx, 1);
      localStorage.setItem('cart', JSON.stringify(cartLocal));
      dispatch(addArrProductToCart(cartLocal));
      setCartProduct(prev => {
        prev.splice(indx, 1);
        return [...prev];
      });
    }
  };

  return (
    <div className='container m-auto'>
      <h1>Cart</h1>
      {cartProducts.length > 0 ? (
        <div
          className={renderPolices ? `cart-wrapper-polices` : `cart-wrapper`}>
          <div className='cart-check-out-wrapper'>
            <BoxContainer title='Check Out'>
              Total price: {price} $
              <Button classes='primary-button'>Check Out</Button>
            </BoxContainer>
          </div>
          <div className='cart-products-list-wrapper'>
            {cartProducts.map((product, indx) => (
              <BoxContainer key={indx}>
                <div className='cart-product-list-wrapper'>
                  <div className='product-list-img-wrapper'>
                    <img
                      src={
                        product.product_id.imgs[0] &&
                        product.product_id.imgs[0].startsWith('http')
                          ? product.product_id.imgs[0]
                          : `${process.env.REACT_APP_SERVER_URL}/images/products/${product.product_id.imgs[0]}`
                      }
                      alt=''
                    />
                  </div>
                  <div className='product-list-details-wrapper'>
                    <h3 className='product-details-title'>
                      {product.product_id.name}
                    </h3>
                    <p>Qty: {product.quantity}</p>
                    <p>Price: {product.product_id.price}$</p>
                    <Button
                      onclick={handleDeleteProduct(indx)}
                      classes='danger-button grid-button'>
                      Remove
                    </Button>
                  </div>
                </div>
                {product.selectOption.length > 0 && (
                  <div className='cart-product-option-wrapper'>
                    {product.selectOption.map((option, indx) => (
                      <div
                        key={indx}
                        className='option-wrapper'>
                        <p>{option.name}:</p>
                        <p>{option.option}</p>
                      </div>
                    ))}
                  </div>
                )}
              </BoxContainer>
            ))}
          </div>
          {renderPolices ? (
            <div className='cart-info-wrapper'>
              <BoxContainer title='Delivery Information'>
                <div className='info-wrapper mt-3'>
                  <div className='info-card'>
                    <h5>Lorem, ipsum dolor.</h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid est odit non itaque, quaerat atque velit, possimus
                    dolore voluptatem sint veritatis. Cumque odio doloremque
                    sapiente consectetur recusandae laudantium corporis earum
                    rem quas, maxime quidem autem sed officia facilis, adipisci
                    nemo blanditiis eligendi illum quia, dolorem est culpa.
                    Omnis, eum quo!
                  </div>
                  <div className='info-card'>
                    <h5>Lorem, ipsum dolor.</h5>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Beatae qui saepe corrupti, odio ipsum esse ipsam laboriosam
                    aspernatur numquam autem sunt, repellendus repudiandae
                    perspiciatis cumque sequi a sed voluptatum, aperiam
                    similique odit! Tempore, accusantium placeat. Dolor eaque
                    officia perspiciatis beatae placeat quo perferendis
                    molestias nulla id possimus quasi iure dolores quas deserunt
                    eum dicta doloribus, cumque impedit iusto laboriosam omnis
                    quam debitis sit delectus. Nisi consequuntur sit dignissimos
                    assumenda eius cum officiis at atque aperiam accusantium
                    fuga amet, veritatis quos sint provident perspiciatis
                    corrupti quis hic expedita quisquam. Iusto ea ex ipsa omnis
                    ipsum unde facilis nulla sequi rerum cumque?
                  </div>
                  <div className='info-card'>
                    <h5>Lorem, ipsum dolor.</h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid est odit non itaque, quaerat atque velit, possimus
                    dolore voluptatem sint veritatis. Cumque odio doloremque
                    sapiente consectetur recusandae laudantium corporis earum
                    rem quas, maxime quidem autem sed officia facilis, adipisci
                    nemo blanditiis eligendi illum quia, dolorem est culpa.
                    Omnis, eum quo!
                  </div>
                </div>
              </BoxContainer>
            </div>
          ) : null}
        </div>
      ) : (
        <Box classes='bg-secondary-ofwood'>
          <div className='no-product-wrapper '>
            <h5>No products in your cart</h5>
          </div>
        </Box>
      )}
    </div>
  );
};

export default Cart;
