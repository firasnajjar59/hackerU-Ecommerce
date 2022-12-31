/** @format */

const updateInputs = (ev, setFunc) => {
  setFunc(prev => {
    prev[ev.target.dataset.label] = ev.target.value;
    return {
      ...prev,
    };
  });
};

export default updateInputs;
