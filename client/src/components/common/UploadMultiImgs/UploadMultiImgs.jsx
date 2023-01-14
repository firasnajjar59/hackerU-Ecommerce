import Input from '../Input/Input'
import MaterialIcon from '../MaterialIcon/MaterialIcon'
import './uploadMultiImgs.scss'

const UploadMultiImgs = (props) => {
  return (
    <label htmlFor="imgs" className='multi-imgs-label'>
        <p>Can upload 3 images</p>
        <MaterialIcon title="upload"/>
        <div className="imgs-names-wrapper">
        <p className=''>{props.imgsName.length>0?props.imgsName[0] : 'example1.jpeg'}</p>
        <p className=''>{props.imgsName.length>0?props.imgsName[1] : 'example2.jpeg'}</p>
        <p className=''>{props.imgsName.length>0?props.imgsName[2] : 'example3.jpeg'}</p>
        </div>
        <Input classes="multi-imgs-input" datalabel="imgs" type="file" name="imgs" id="imgs" onchange={props.onchange} multi={true}/>
    </label>
  )
}

export default UploadMultiImgs