/** @format */

import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import './popUp.scss';
const PopUp = props => {

  return (
    <>
      <div className={`popup-overlay ${props.classes}`}></div>
      <div className={`${props.popupClasses} ${props.classes}`}>
        <div className='row p-3 w-100'>
          <MaterialIcon
            onclick={props.onclick}
            classes='popup-close'
            title='close'
          />
        </div>
        <div className={`row popup-children ${props.childrenClasses} ${props.classes}`}>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default PopUp;
