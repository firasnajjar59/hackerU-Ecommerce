import MaterialIcon from "components/common/MaterialIcon/MaterialIcon"
import "./contactUs.scss"
import Button from "components/common/Button/Button"

const ContactUs = (props) => {
  return (
    <section className='row'>
    <div className='col-sm-4 ratio-1 bg-primary-ofwood'>
      <iframe
        title='map'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1695.5766765018352!2d35.23799434180633!3d31.79357027506951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8110af18e83630b6!2zMzHCsDQ3JzM2LjgiTiAzNcKwMTQnMTIuOCJF!5e0!3m2!1siw!2sil!4v1672588395283!5m2!1siw!2sil'
        width='100%'
        height='100%'
        style={{ border: '0' }}
        allowFullScreen=''
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'></iframe>
    </div>
    <div className='col-sm-4 ratio-1 bg-primary-ofwood contact-us-card-dark'>
      <h3>Meet Us</h3>
      <div className='align-parts'>
        <MaterialIcon title='phone_in_talk' />
        {props.phone}
      </div>
      <div className='align-parts'>
        <MaterialIcon title='alternate_email' />
        {props.email}
      </div>
      <div className='align-parts'>
        <MaterialIcon title='location_on' />
        {props.address}
      </div>
    </div>
    <div className='col-sm-4 ratio-1 bg-secondary-ofwood contact-us-card-light'>
      <h3>Pitch Us</h3>
      <p>hello,<br/>my name is <span className='bold'>your name</span> and my e-mail address is <span className='bold'>your e-mail</span> and I would like to get info about <span className='bold'>this product</span></p>
      <Button classes="primary-button">Send</Button>
    </div>
  </section>
  )
}

export default ContactUs