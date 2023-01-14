/** @format */
import './categorySection.scss';
import CategoryRound from './CategoryRound';

const CategorySection = props => {
  return (
    <section className='container-fluid bg-primary-opacity trans'>
      <div className='container m-auto mt-5 p-5 trans-inner'>
        <div className='row '>
          {props.options &&
            props.options.map((item, indx) => (
              <div
                key={indx}
                className='p-1 category-round-wrapper'>
                <CategoryRound
                  title={item.title}
                  src={item.url}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
