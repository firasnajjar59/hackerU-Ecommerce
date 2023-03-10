import { useHistory, useLocation, useParams } from 'react-router-dom'
import './editProduct.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'components/common/Button/Button'
import Box from 'components/common/Box/Box'
import MultiOption from '../CreateProduct/MultiOption/MultiOption'
import DropMenu from 'components/common/Input/DropMenu'
import TextArea from 'components/common/Input/TextArea'
import Input from 'components/common/Input/Input'
import updateInputs from 'functions/updateInputs'
import UploadMultiImgs from 'components/common/UploadMultiImgs/UploadMultiImgs'
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon'
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler'
import { useDispatch } from 'react-redux'
import { resetMessage, setMessage } from 'store/toast'


const EditProduct = () => {
  const {slug,id}=useParams()
  const ofwoodErrorhandler=useOfwoodErrorhandler()
  const dispatch=useDispatch()
  document.title = `Edit ${slug.split("-").join(" ").toUpperCase()} | ofwood`;
    const history=useHistory()

    // 
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
    //   
    useEffect(()=>{
        (async ()=>{
            try {
                const {data}=await axios.get(`/v1/products/${id}`)
                setInputs(prev=>{
                    const {doc}=data
                    prev.name=doc.name;
                    prev.description=doc.description;
                    prev.price=doc.price;
                    prev.selectOption=doc.selectOption;
                    prev.properties=doc.properties;
                    return{
                        ...prev
                    }
                })
                setImgsName(data.doc.imgs)
            } catch (error) {
              ofwoodErrorhandler(error.response.data)
            }
        })()
    },[])

// 
    const handleInputs = ev => updateInputs(ev, setInputs);
    const backward = () => history.goBack();
    const handleOptionChangesApplied = fieldToUpdate => arr => {
        setInputs(prev => {
          prev[fieldToUpdate] = arr;
          return {
            ...prev,
          };
        });
      };
    //   
    const UpdateProduct= async()=>{
        try {
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
        imgs.length>0&&imgs.forEach(file=>formData.append('images',file))
        // 
        await axios.patch(`/v1/products/${id}`,formData,{ headers: {'Content-Type': 'multipart/form-data'}})
        dispatch(setMessage("The product updated"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },3000)
        } catch (error) {
          ofwoodErrorhandler(error.response.data)
        }
      }
    //   
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
    //   
    

  return (
    <>
    <Box classes="bg-secondary-ofwood back-btn mb-3">
      <MaterialIcon onclick={backward} title="arrow_back_ios" />
    </Box>
    <h2 className='mb-3'>Edit Product</h2>
    <Box classes={"mb-3 bg-secondary-ofwood"}>
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
    <Box classes={"mb-3 bg-secondary-ofwood"}>

      <MultiOption
      arrayOption={true}
        onapply={handleOptionChangesApplied('selectOption')}
        title='Options'
        firstInpLabel='Title'
        firstPlaceholder='color'
        secondInpLabel='Options'
        secondPlaceholder='red,blue,green'
        defaultOptions={inputs.selectOption.length>0&&inputs.selectOption}
      />
    </Box>
    <Box classes={"mb-3 bg-secondary-ofwood"}>
      <MultiOption
        onapply={handleOptionChangesApplied('properties')}
        title='Properties'
        firstInpLabel='Property'
        firstPlaceholder='width'
        secondInpLabel='Description'
        secondPlaceholder='190 cm'
        defaultOptions={inputs.properties.length>0&&inputs.properties}
      />
    </Box>
    <Box classes={"mb-3 bg-secondary-ofwood"}>
      <h5>Upload images</h5>
      <UploadMultiImgs
      onchange={handleFilesFromInput}
      imgsName={imgsName}
      />
    </Box>
    <Button
    onclick={UpdateProduct}
    classes='primary-button'>Update Product</Button>
    </>
  )
}

export default EditProduct