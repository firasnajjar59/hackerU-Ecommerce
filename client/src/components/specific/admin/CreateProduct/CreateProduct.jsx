/** @format */

import { useState } from 'react';
import './createProduct.scss';
import Input from 'components/common/Input/Input';
import DropMenu from 'components/common/Input/DropMenu';
import TextArea from 'components/common/Input/TextArea';
import Button from 'components/common/Button/Button';
import MultiOption from './MultiOption/MultiOption';
import updateInputs from 'functions/updateInputs';
import axios from 'axios';
import UploadMultiImgs from 'components/common/UploadMultiImgs/UploadMultiImgs';
import Box from 'components/common/Box/Box';
import { useDispatch } from 'react-redux';
import { resetMessage, setMessage } from 'store/toast';
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler';

const CreateProduct = () => {
  document.title = `Create Product | ofwood`;
const dispatch=useDispatch()
const ofwoodErrorhandler=useOfwoodErrorhandler()
  const [imgs,setImgs]=useState([])
  const [imgsName,setImgsName]=useState([])
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
    selectOption: [],
    properties: [],
    category: '',
  });

  const handleOptionChangesApplied = fieldToUpdate => arr => {
    setInputs(prev => {
      prev[fieldToUpdate] = arr;
      return {
        ...prev,
      };
    });
  };
  const handleInputs = ev => updateInputs(ev, setInputs);
  const handleFilesFromInput=(ev)=>{
    let files=[]
    let filesName=[]
    for (let file of Object.values(ev.target.files)){
      files.push(file)
      filesName.push(file.name)
    }
    setImgs(files)
    setImgsName(filesName)
  }
  const createProduct= async()=>{
    try {
      // eslint-disable-next-line no-throw-literal
      if(inputs.name.length==0) throw ({message:"name can't be empty"})
      // eslint-disable-next-line no-throw-literal
      if(inputs.description==0) throw ({message:"Description can't be empty"})
      // eslint-disable-next-line no-throw-literal
      if(inputs.price.length==0) throw ({message:"Price can't be empty"})
      // eslint-disable-next-line no-throw-literal
      if(isNaN(inputs.price)) throw ({message:"Price must be a number"})
    const formData=new FormData();
    // 
    formData.append('name',inputs.name)
    formData.append('price',inputs.price)
    formData.append('description',inputs.description)
    formData.append('category',inputs.category)
    // 
    let selectOptionArr;
    selectOptionArr=JSON.stringify(inputs.selectOption)
    inputs.selectOption.length>0&&formData.append('selectOption',selectOptionArr)
    // 
    let propertiesArr;
    propertiesArr=JSON.stringify(inputs.properties)
    inputs.properties.length>0&&formData.append('properties',propertiesArr)
    // 
    console.log(imgs);
    if(imgs.length>0){
      imgs.forEach(file=>formData.append('images',file))
    }else{
      throw ({message:"Please you can't create a product without photos"})
    }
    // 
    
    let {data}= await axios.post("/v1/products",formData,{ headers: {'Content-Type': 'multipart/form-data'}})
    console.log(data);
    dispatch(setMessage("The product created"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },3000)
    } catch (error) {
      if(error.response){
        ofwoodErrorhandler(error.response.data)
      }else{
        ofwoodErrorhandler(error)
      }
    }
  }
  return (
    <Box>
      <h2>Create Product</h2>
      <Box classes={"bg-secondary-ofwood"}>
        <h5>Prodact details</h5>
        <div className='name-price-wrapper'>
          <Input
            datalabel='name'
            name="name"
            value={inputs.name}
            onchange={handleInputs}
            placeholder='Product name'
          />
          <Input
            placeholder='Price'
            datalabel='price'
            value={inputs.price}
            onchange={handleInputs}
            name='price'
          />
        </div>
        <TextArea
          datalabel='description'
          value={inputs.description}
          onchange={handleInputs}
          placeholder='Description'
          name='description'
        />
        <DropMenu />
      </Box >
      <Box classes={"bg-secondary-ofwood"}>

        <MultiOption
        arrayOption={true}
          onapply={handleOptionChangesApplied('selectOption')}
          title='Options'
          firstInpLabel='Title'
          firstPlaceholder='color'
          secondInpLabel='Options'
          secondPlaceholder='red,blue,green'
        />
      </Box>
      <Box classes={"bg-secondary-ofwood"}>
        <MultiOption
          onapply={handleOptionChangesApplied('properties')}
          title='Properties'
          firstInpLabel='Property'
          firstPlaceholder='width'
          secondInpLabel='Description'
          secondPlaceholder='190 cm'
        />
      </Box>
      <Box classes={"bg-secondary-ofwood"}>
        <h5>Upload images</h5>
        <UploadMultiImgs onchange={handleFilesFromInput} imgsName={imgsName} />
      </Box>
      <Button onclick={createProduct} classes='primary-button'>Create Product</Button>
    </Box>
  );
};

export default CreateProduct;
