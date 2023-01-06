/** @format */

import SideSortComponent from 'components/common/BoxContainer/BoxContainer';
import './cart.scss';

import React from 'react';
import Button from 'components/common/Button/Button';

const Cart = () => {
  return (
    <div className='container m-auto'>
      <h1>Cart</h1>
      <div className='cart-wrapper'>
        <div className='cart-check-out-wrapper'>
          <SideSortComponent title="Check Out">
                hi
                <Button classes="primary-button">Check Out</Button>
            </SideSortComponent>
        </div>
        <div className='cart-products-list-wrapper'>
          <SideSortComponent>
            <div className='cart-product-list-wrapper'>
              <div className='product-list-img-wrapper'>
                <img
                  src='../../../zahi_v1_2022-Mar-10_10-44-17AM-000_CustomizedView3183948036.png'
                  alt=''
                />
              </div>
              <div className='product-list-details-wrapper'>
                <h3 className='product-details-title'>
                  Lorem ipsum dolor sit.
                </h3>
                <p>Qty: 100</p>
                <p>Price: 600$</p>
              </div>
            </div>
          </SideSortComponent>
          <SideSortComponent>
            <div className='cart-product-list-wrapper'>
              <div className='product-list-img-wrapper'>
                <img
                  src='../../../zahi_v1_2022-Mar-10_10-44-17AM-000_CustomizedView3183948036.png'
                  alt=''
                />
              </div>
              <div className='product-list-details-wrapper'>
                <h3 className='product-details-title'>
                  Lorem ipsum dolor sit.
                </h3>
                <p>Qty: 100</p>
                <p>Price: 600$</p>
              </div>
            </div>
          </SideSortComponent>
          <SideSortComponent>
            <div className='cart-product-list-wrapper'>
              <div className='product-list-img-wrapper'>
                <img
                  src='../../../zahi_v1_2022-Mar-10_10-44-17AM-000_CustomizedView3183948036.png'
                  alt=''
                />
              </div>
              <div className='product-list-details-wrapper'>
                <h3 className='product-details-title'>
                  Lorem ipsum dolor sit.
                </h3>
                <p>Qty: 100</p>
                <p>Price: 600$</p>
              </div>
            </div>
          </SideSortComponent>
        </div>
        <div className='cart-info-wrapper'>
          <SideSortComponent title='Delivery Information'>
            <div className='info-wrapper'>
              <div className='info-card'>
                <h5>Lorem, ipsum dolor.</h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                est odit non itaque, quaerat atque velit, possimus dolore
                voluptatem sint veritatis. Cumque odio doloremque sapiente
                consectetur recusandae laudantium corporis earum rem quas,
                maxime quidem autem sed officia facilis, adipisci nemo
                blanditiis eligendi illum quia, dolorem est culpa. Omnis, eum
                quo!
              </div>
              <div className='info-card'>
                <h5>Lorem, ipsum dolor.</h5>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
                qui saepe corrupti, odio ipsum esse ipsam laboriosam aspernatur
                numquam autem sunt, repellendus repudiandae perspiciatis cumque
                sequi a sed voluptatum, aperiam similique odit! Tempore,
                accusantium placeat. Dolor eaque officia perspiciatis beatae
                placeat quo perferendis molestias nulla id possimus quasi iure
                dolores quas deserunt eum dicta doloribus, cumque impedit iusto
                laboriosam omnis quam debitis sit delectus. Nisi consequuntur
                sit dignissimos assumenda eius cum officiis at atque aperiam
                accusantium fuga amet, veritatis quos sint provident
                perspiciatis corrupti quis hic expedita quisquam. Iusto ea ex
                ipsa omnis ipsum unde facilis nulla sequi rerum cumque?
              </div>
              <div className='info-card'>
                <h5>Lorem, ipsum dolor.</h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                est odit non itaque, quaerat atque velit, possimus dolore
                voluptatem sint veritatis. Cumque odio doloremque sapiente
                consectetur recusandae laudantium corporis earum rem quas,
                maxime quidem autem sed officia facilis, adipisci nemo
                blanditiis eligendi illum quia, dolorem est culpa. Omnis, eum
                quo!
              </div>
            </div>
          </SideSortComponent>
        </div>
      </div>
    </div>
  );
};

export default Cart;
