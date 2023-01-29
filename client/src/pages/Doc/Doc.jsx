/** @format */

import { useState } from 'react';
import './doc.scss';
import { useEffect } from 'react';
import axios from 'axios';
import Circles from 'models/CanvasClasses/Circles';
import Line from 'models/CanvasClasses/Line';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Box from 'components/common/Box/Box';
import ExpandSection from 'components/common/ExpandSection/ExpandSection';

const Doc = () => {
  document.title = `Docs | ofwood`;
  const screenWidth = useSelector(state => state.screenSize.screenWidth);
  const screenHeight = useSelector(state => state.screenSize.screenHeight);
  const theme = useSelector(state => state.theme.theme);
  const canvasRef = useRef();
  const docRef = useRef();
  const [canvasHeight, setCanvasHeight] = useState();
  const [canvasWidth, setCanvasWidth] = useState();
  let canvas = canvasRef.current;
  const [businessName, setBusinessName] = useState();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          '/v1/users/admin/webcontent/businussname'
        );
        setBusinessName(data.data.doc[0].content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    setCanvasHeight(docRef.current.offsetHeight);
    setCanvasWidth(docRef.current.offsetWidth);
  }, []);
  useEffect(() => {
    setCanvasHeight(docRef.current.offsetHeight);
    setCanvasWidth(docRef.current.offsetWidth);
  }, [screenWidth, screenHeight]);
  useEffect(() => {
    if (canvasHeight && canvasWidth) {
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      const ctx = canvas.getContext('2d');
      let circle_1 = new Circles(
        canvasWidth / 15,
        canvasHeight / 5,
        100,
        0,
        2 * Math.PI,
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue('--primary-color')
      );
      circle_1.drawFill(ctx);
      let circle_2 = new Circles(
        canvasWidth - canvasWidth / 10,
        canvasHeight / 4,
        100,
        0,
        2 * Math.PI,
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue('--third-color')
      );
      circle_2.drawFill(ctx);
      let circle_3 = new Circles(
        canvasWidth - canvasWidth / 14,
        canvasHeight - canvasHeight / 9,
        50,
        0,
        2 * Math.PI,
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue('--primary-color'),
        10
      );
      circle_3.drawStroke(ctx);
      let line_1 = new Line(
        canvasWidth / 19,
        canvasHeight - canvasHeight / 14,
        canvasWidth / 1.5,
        canvasHeight - canvasHeight / 1,
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue('--primary-color'),
        2
      );
      line_1.drawLine(ctx);
      let line_2 = new Line(
        canvasWidth / 19,
        canvasHeight - canvasHeight / 2,
        canvasWidth / 1.5,
        canvasHeight - canvasHeight / 10,
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue('--third-color'),
        5
      );
      line_2.drawLine(ctx);
    }
  }, [canvasHeight, canvasWidth, theme]);
  return (
    <>
      <canvas
        id='docCanvas'
        ref={canvasRef}>
        Your browser does not support the HTML canvas tag.
      </canvas>
      <div
        className='doc'
        ref={docRef}>
        <div className='doc-content'>
          <h1 className='color-primary-ofwood'>
            {`${businessName} project` || `Project name`}
          </h1>
          <Box classes='bg-primary-opacity mt-2 mb-2'>
            <div className='doc-content-wrapper'>
              <a
                target='_blank'
                href='https://github.com/firasnajjar59/hackerU-Ecommerce.git'
                rel='noreferrer'>
                {`${businessName || 'Project name'} repository`}
              </a>
              <a
                target='_blank'
                href='https://documenter.getpostman.com/view/23238687/2s8ZDYWLmT'
                rel='noreferrer'>
                API documentation
              </a>
              <a
                target='_blank'
                href='https://store.firasnajjar.com'
                rel='noreferrer'>
                Live site
              </a>
              <a
                href='../../../favicon.jpg'
                rel='noreferrer'
                download>
                Download instractions
              </a>
            </div>
          </Box>
          <div className='doc-description'>
            <h5 className='mt-3'>{businessName} ecommerce</h5>
            <p>
              This website is an example of an online store. You can register as
              a subscriber in the store and add products to your favorites and
              the subscriber's shopping cart. You can edit the subscription
              details after registration and upload a profile picture. And if
              the subscriber connects from another device, he will still be able
              to see all the products added to favorites and the shopping cart.
              There are three types of users, the first is a regular user, the
              second is an editor for the website and the third is a super user
              who has access to more options. After adding a product to the
              shopping cart, you can make a payment via Stripe. There is an
              option to track the status of a user's orders under the profile
              tab. Any user who registers on the website can give his opinion on
              a product, etc.
            </p>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='What was used to carry out the project?'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    <h6 className='mt-2'>Front end</h6>
                    <ul>
                      <li>React library</li>
                      <li>Redux</li>
                      <li>axios</li>
                      <li>bootstrap</li>
                      <li>joi-browser</li>
                      <li>jwt-decode</li>
                      <li>react-error-boundray</li>
                      <li>canvas</li>
                      <li>sass</li>
                      <li>oop</li>
                    </ul>
                    BOOTSTRAP is used less, not because of a lack of knowledge,
                    on the contrary, I think that those who know CSS can work
                    with any other library like bootstrap, that's why I wanted
                    to challenge myself and expand my abilities in CSS 😄.
                    <h6 className='mt-3'>Back end</h6>
                    <ul>
                      <li>Node.js</li>
                      <li>Express.js</li>
                      <li>oop</li>
                      <li>dotenv</li>
                      <li>bcryiptjs</li>
                      <li>mongoose</li>
                      <li>multer</li>
                      <li>sharp</li>
                      <li>stripe</li>
                    </ul>
                  </p>
                </Box>
              </ExpandSection>
            </Box>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='Users Types'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    The system accepts three types of users, a normal user and
                    is limited in terms of performing actions, the actions that
                    a normal user can perform are adding to favorites or the
                    shopping cart or changing a photo and personal data or
                    making a purchase. The second user is an editor user, this
                    user is much less limited than a normal user but still
                    limited, he can perform all the actions that a normal user
                    performs and in addition can edit products, stock quantity,
                    site content for example add photos to the main gallery of
                    the site, etc. The third user is the strongest user among
                    the three users, he can do everything that the other users
                    can do and in addition can edit two options from the users,
                    one is the user status and the other is blocking and
                    unblocking other users, this is in terms of users.
                  </p>
                </Box>
              </ExpandSection>
            </Box>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='How to change user type'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    To change user type from normal user to editor or super
                    user, a limited system is built to change user type. Under
                    the profile tab you can access the users and change the type
                    of user and change the status of the user if he is an active
                    user or stop his activity, and even delete the user
                    completely from the database. This is the only option to
                    change the type of user and this system only has access to
                    the super user.
                  </p>
                </Box>
              </ExpandSection>
            </Box>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='Store'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    On the store page you can see all the products offered in
                    the store. You can search by product name, you can sort by
                    price or product name. The products are received from the
                    server with a limit and according to pages, the limit is
                    transferred through the URL, the filtering is also done on
                    the server through the URL.
                  </p>
                </Box>
              </ExpandSection>
            </Box>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='Add product'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    Under the profile tab you can add a new product to the site,
                    access is only open to super users. There is consideration
                    that each product has its own features, and there is
                    consideration that each product has its own options. For
                    example, a certain product comes in a certain size, this is
                    called a features, and is sold in different colors, this is
                    options. When building a new product or an update, the super
                    user can add features and options as needed. And when buying
                    a product, the user can choose one of the options added to
                    the product.
                  </p>
                </Box>
              </ExpandSection>
            </Box>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='Order management system'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    A reasonable order management system, through which we can
                    change the status of an order, for example, to sent or the
                    order has reached its destination. we can also change
                    payment status. If we open the order, we can send the
                    buyer a message via email. we can also search for an order
                    by date, email or status.
                  </p>
                </Box>
              </ExpandSection>
            </Box>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='Registertion and Login'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    It will be possible to register or connect as a user through
                    the icons found in the main menu. The fields are validated
                    before sending the form to the server, and a message is
                    displayed accordingly. After logging in, some of the icons
                    in the main menu are changed and an icon of a user's default
                    image is also added. And when you click on the picture you
                    go to the profile page. On this page you can edit the user's
                    information and track the orders he made and the products
                    added to favorites.
                  </p>
                </Box>
              </ExpandSection>
            </Box>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='Inventory Management'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    The inventory management system will be accessible under the
                    profile tab. In order for the user to have access to this
                    system, he must be an editor or a superuser. Mainly this
                    system allows the user to change the stock quantity of the
                    products. And if the stock of a certain product reaches a
                    low point that we define, it sends an email to the emails we
                    defined for it. And if a customer places an order, the
                    amount of inventory is indeed updated according to the order
                    placed.
                  </p>
                </Box>
              </ExpandSection>
            </Box>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='Newsletter'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    A very simple mailing system, which sends an email to all
                    the people who signed up for the list, not to the users who
                    signed up for the website. Only the super user has access to
                    this system. It will be possible to access the system under
                    the profile tab.
                  </p>
                </Box>
              </ExpandSection>
            </Box>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='Reviews'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    On the page of each product there is a system of opinions.
                    Any customer registered on the website can leave his opinion
                    on the product. For now, this system is very limited, it
                    does not have the option of deleting, editing or filtering
                    offensive content. But the plan is to add the options
                    mentioned above.
                  </p>
                </Box>
              </ExpandSection>
            </Box>
            <Box classes='bg-secondary-opacity mt-3'>
              <ExpandSection title='Statistics'>
                <Box classes='bg-secondary-ofwood'>
                  <p>
                    A very limited set of statistics. You can track the product
                    that has been added to favorites or to the shopping cart.
                    You can see the total income for a certain year, or
                    alternatively you can see the total income for the current
                    month, you can also see the amount of products sold this
                    month, you can see an average of the redemption of the
                    orders placed on the site. Access to this system is limited
                    only to the super user, and it can be accessed under the
                    profile tab.
                  </p>
                </Box>
              </ExpandSection>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doc;
