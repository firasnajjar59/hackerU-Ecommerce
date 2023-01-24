/** @format */

import ExpandSection from 'components/common/ExpandSection/ExpandSection';
import './updateAboutUs.scss';
import Box from 'components/common/Box/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TextArea from 'components/common/Input/TextArea';
import Input from 'components/common/Input/Input';
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import Button from 'components/common/Button/Button';
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler';
import { useDispatch } from 'react-redux';
import { resetMessage, setMessage } from 'store/toast';

const UpdateAboutUs = () => {
  const ofwoodErrorhandler=useOfwoodErrorhandler()
  const dispatch=useDispatch()
  const [inputs, setInputs] = useState({
    contents: [],
  });
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/v1/users/admin/webcontent/aboutus');
        setInputs({
          contents: data.data.doc[0].contents,
        });
      } catch (error) {
      ofwoodErrorhandler(error.response.data)
      }
    })();
  }, []);
  const deleteOneOption = indx => () => {
    setInputs(prev => {
      prev.contents.splice(indx, 1);
      return { ...prev };
    });
  };
  const addOneOption = () => {
    setInputs(prev => {
      prev.contents.push({ title: '', content: '' });
      return { ...prev };
    });
  };
  const handleOnChange = indx => ev => {
    setInputs(prev => {
      prev.contents[indx][ev.target.dataset.label] = ev.target.value;
      return { ...prev };
    });
  };
  const handleAboutUsChange = async () => {
    try {
      await axios.patch('/v1/users/admin/webcontent', {
        name: 'aboutus',
        contents: inputs.contents,
      });
      dispatch(setMessage("The content updated"))
      setTimeout(()=>{
        dispatch(resetMessage())
      },3000)
    } catch (error) {
      ofwoodErrorhandler(error.response.data)
    }
  };
  return (
    <Box classes={'bg-secondary-ofwood'}>
      <ExpandSection title='About Us'>
        {inputs.contents.length > 0 && (
          <Box classes='bg-primary-opacity'>
            {inputs.contents.map((para, indx) => (
              <Box key={indx} classes='bg-secondary-ofwood'>
                <div className='d-flex justify-content-between'>
                  <h6>Title</h6>
                  <MaterialIcon
                    onclick={deleteOneOption(indx)}
                    title='delete'
                  />
                </div>
                <Input
                  onchange={handleOnChange(indx)}
                  datalabel='title'
                  value={para.title}
                />
                <h6>content</h6>

                <TextArea
                  classes='about-us-text-area'
                  onchange={handleOnChange(indx)}
                  datalabel='content'
                  value={para.content}
                />
              </Box>
            ))}
          </Box>
        )}

        <div
          onClick={addOneOption}
          className='add-option'>
          <MaterialIcon title='add_box' />
        </div>
        <Button
          onclick={handleAboutUsChange}
          classes={
            inputs.contents.length > 0 ? 'primary-button' : 'disabled-button'
          }>
          Apply changes
        </Button>
      </ExpandSection>
    </Box>
  );
};

export default UpdateAboutUs;
