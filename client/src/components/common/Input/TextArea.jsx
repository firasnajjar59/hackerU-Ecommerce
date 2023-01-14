/** @format */

import './textArea.scss';

const TextArea = props => {
  return (
    <textarea
      value={props.value}
      onChange={props.onchange}
      data-label={props.datalabel}
      name={props.name}
      className={`text-area ${props.classes}`}
      placeholder={props.placeholder}
      id={props.id}
    />
  );
};

export default TextArea;
