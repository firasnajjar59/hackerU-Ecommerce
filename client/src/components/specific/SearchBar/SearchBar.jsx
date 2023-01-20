/** @format */

import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import './searchBar.scss';
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';

const SearchBar = props => {
  return (
    <div className='searchWrapper d-flex justify-content-center'>
      <Input
        classes={`border-right-none ${props.classes}`}
        placeholder='search'
        type='text'
        value={props.value}
        onchange={props.onchange}
        datalabel='search'
      />
      <Button onclick={props.onclick} classes='search-button'>
        <MaterialIcon
          classes='p-1'
          title='search'
        />
      </Button>
    </div>
  );
};

export default SearchBar;
