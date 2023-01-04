import { useState } from 'react'
import MaterialIcon from '../MaterialIcon/MaterialIcon'
import './accordion.scss'
const Accordion = () => {
    const [accordionSectionOption,setAccordionSectionOption]=useState([{class:"",tag:"remove"},{class:"hidden",tag:"add"},{class:"hidden",tag:"add"}])
    const handleAccordionToggle = (id)=>(e) => { 
     setAccordionSectionOption(prev=>{
        let is_open=prev[id].class!="hidden"
        prev.forEach(el => {
            el.class="hidden"
            el.tag="add"
           return el
        })
        if(is_open){
            prev[id].class="hidden"
            prev[id].tag="add"
            
        }else{
            prev[id].class=""
            prev[id].tag="remove"
        }
        return [
            ...prev
        ]
        
     })
     }
  return (
    <div
    className='accordione-wrapper'>
    <div className='one-section'>
      <div onClick={handleAccordionToggle("0")} className="accordione-title">
      <h4>lorem ipson</h4>
      <MaterialIcon classes="accordion-span" title={accordionSectionOption[0].tag}/>
      </div>
      <p className={`accordion-p ${accordionSectionOption[0].class}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptate doloremque quam necessitatibus. Itaque, soluta. Optio blanditiis incidunt ab ad cumque recusandae repellat fugit cupiditate architecto maiores! Et vel maxime officia vitae exercitationem debitis, delectus adipisci! Fuga voluptatum, officia, adipisci dolore labore beatae eaque reiciendis, laboriosam molestiae quia minima aut.
      </p>
      <hr />
    </div>
    <div className='one-section'>
    <div onClick={handleAccordionToggle("1")} className="accordione-title">
      <h4>lorm ipson</h4>
      <MaterialIcon classes="accordion-span" title={accordionSectionOption[1].tag}/>
      </div>
      <p className={`accordion-p ${accordionSectionOption[1].class}`}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum consectetur architecto, tempora adipisci repellendus ducimus? Deleniti fugit animi eum unde, deserunt modi architecto? Rem beatae id odio, facere labore at nesciunt, nemo laudantium excepturi debitis mollitia dolor earum laborum deserunt.
      </p>
      <hr />
    </div>
    <div className='one-section'>
    <div onClick={handleAccordionToggle("2")} className="accordione-title">
      <h4>lorm ipson</h4>
      <MaterialIcon classes="accordion-span" title={accordionSectionOption[2].tag}/>
      </div>
      <p className={`accordion-p ${accordionSectionOption[2].class}`}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores necessitatibus rem explicabo consequatur et fugit illo dolorum neque, commodi blanditiis quam! Explicabo, rerum cupiditate eaque corrupti omnis aliquid libero assumenda, reiciendis beatae debitis, cumque numquam? Eos esse, minima odit unde ea, saepe incidunt, fugiat facere commodi omnis voluptatem. Ea accusamus enim magnam quis debitis saepe sit eius quod asperiores voluptatibus.
      </p>
      <hr />
    </div>
  </div>
  )
}

export default Accordion