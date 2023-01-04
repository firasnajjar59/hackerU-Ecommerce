import "./Gallery.scss"
const Gallery = (props) => {
  return (
    <div className="gallery">
      <div><div className="caption">{props.photos[0].caption}</div><img src={props.photos[0].src} alt={props.photos[0].alt} /></div>
      <div className="v-stretch"><div className="caption">{props.photos[1].caption}</div><img src={props.photos[1].src} alt={props.photos[1].alt} /></div>
      <div className="h-stretch"><div className="caption">{props.photos[2].caption}</div><img src={props.photos[2].src} alt={props.photos[2].alt} /></div>
      <div className="big-stretch"><div className="caption">{props.photos[3].caption}</div><img src={props.photos[3].src} alt={props.photos[3].alt} /></div>
      <div><div className="caption">{props.photos[4].caption}</div><img src={props.photos[4].src} alt={props.photos[4].alt} /></div>
      <div className="v-stretch"><div className="caption">{props.photos[5].caption}</div><img src={props.photos[5].src} alt={props.photos[5].alt} /></div>
      <div className="h-stretch"><div className="caption">{props.photos[6].caption}</div><img src={props.photos[6].src} alt={props.photos[6].alt} /></div>
      <div><div className="caption">{props.photos[7].caption}</div><img src={props.photos[7].src} alt={props.photos[7].alt} /></div>
      <div><div className="caption">{props.photos[8].caption}</div><img src={props.photos[8].src} alt={props.photos[8].alt} /></div>
      <div className="big-stretch"><div className="caption">{props.photos[9].caption}</div><img src={props.photos[9].src} alt={props.photos[9].alt} /></div>
      <div className="h-stretch"><div className="caption">{props.photos[10].caption}</div><img src={props.photos[10].src} alt={props.photos[10].alt} /></div>
      <div className="h-stretch"><div className="caption">{props.photos[11].caption}</div><img src={props.photos[11].src} alt={props.photos[11].alt} /></div>
      <div className="v-stretch"><div className="caption">{props.photos[12].caption}</div><img src={props.photos[12].src} alt={props.photos[12].alt} /></div>
      <div><div className="caption">{props.photos[13].caption}</div><img src={props.photos[13].src} alt={props.photos[13].alt} /></div>
      <div className="v-stretch"><div className="caption">{props.photos[14].caption}</div><img src={props.photos[14].src} alt={props.photos[14].alt} /></div>
      <div className="v-stretch"><div className="caption">{props.photos[15].caption}</div><img src={props.photos[15].src} alt={props.photos[15].alt} /></div>
      <div><div className="caption">{props.photos[16].caption}</div><img src={props.photos[16].src} alt={props.photos[16].alt} /></div>
      <div className="big-stretch"><div className="caption">{props.photos[17].caption}</div><img src={props.photos[17].src} alt={props.photos[17].alt} /></div>
      <div className="h-stretch"><div className="caption">{props.photos[18].caption}</div><img src={props.photos[18].src} alt={props.photos[18].alt} /></div>
      <div><div className="caption">{props.photos[19].caption}</div><img src={props.photos[19].src} alt={props.photos[19].alt} /></div>
      <div><div className="caption">{props.photos[20].caption}</div><img src={props.photos[20].src} alt={props.photos[20].alt} /></div>
    </div>
  )
}

export default Gallery