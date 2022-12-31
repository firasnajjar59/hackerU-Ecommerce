/** @format */

import MainImg from 'components/common/MainImg/MainImg';
import './home.scss';
import FourCardCarusel from 'components/common/FourCardCarusel/FourCardCarusel';
import OurCustemersCarusel from 'components/specific/OurCustemersCarusel/OurCustemersCarusel';
import custemersArr from 'data/Custemers.db';
import RoundedImg from 'components/common/RoundedImg/RoundedImg';
import CategorySection from 'components/common/CategoryRound/CategorySection';
import categoryArr from 'data/category';
import { useSelector } from 'react-redux';
const HomePage = () => {
  const screenSize=useSelector(state=>state.screenSize.screenSize)
  document.title = 'HomePage | ofwood';
  return (
    <>
      <div className='container m-auto'>
        <FourCardCarusel></FourCardCarusel>
      </div>


     <CategorySection options={categoryArr}/>
      <MainImg
        alt='Main img'
        src='https://static.wixstatic.com/media/1d63b2_6c40dcff0d9947138f630628db17f25b~mv2.jpg/v1/fill/w_1440,h_393,al_c,q_85,enc_auto/1d63b2_6c40dcff0d9947138f630628db17f25b~mv2.jpg'
      />
      <div className='container-fluid bg-primary-ofwood'>
        <OurCustemersCarusel>
          {custemersArr.map((item,indx) => (
            <RoundedImg key={indx} src={item} />
          ))}
        </OurCustemersCarusel>
      </div>
    </>
  );
};

export default HomePage;
