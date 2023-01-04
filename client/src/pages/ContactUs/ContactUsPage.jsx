/** @format */

import MainImg from 'components/common/MainImg/MainImg';
import { useSelector } from 'react-redux';
import './contactUsPage.scss';
import ContactUs from 'components/specific/ContactUs/ContactUs';

const ContactUsPage = () => {
  const screenWidth = useSelector(state => state.screenSize.screenWidth);
  return (
    <div className='container-fluid '>
      <div className="container m-auto">
      <MainImg
        src={
          screenWidth > 600
            ? '../../../assets/letsTalk/Happy women sitting and talking to each other.jpg'
            : '../../../assets/letsTalk/5625.jpg'
        }
        alt='contact us'
      />
      </div>
      <div className="container-fluid ">
      <div className='container m-auto'>
       <ContactUs phone="+972-50-767-8000" email="info@ofwood.co.il" address="Wadi Al Joz 1"/>
      </div>
        
      </div>
    </div>
  );
};

export default ContactUsPage;
