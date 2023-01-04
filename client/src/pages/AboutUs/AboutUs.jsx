/** @format */

import { useEffect, useRef, useState } from 'react';
import './aboutUs.scss';
import { useSelector } from 'react-redux';
import Circles from 'models/CanvasClasses/Circles';
import Line from 'models/CanvasClasses/Line';
const AboutUs = () => {
  const screenWidth=useSelector(state=>state.screenSize.screenWidth)
  const screenHeight=useSelector(state=>state.screenSize.screenHeight)
  const theme=useSelector(state=>state.theme.theme)
  const canvasRef = useRef();
  const aboutUsRef = useRef();
  const [canvasHeight,setCanvasHeight]=useState()
  const [canvasWidth,setCanvasWidth]=useState()
  let canvas = canvasRef.current;
  useEffect(() => {
    setCanvasHeight(aboutUsRef.current.offsetHeight)
    setCanvasWidth(aboutUsRef.current.offsetWidth)
  }, []);
  useEffect(() => {
    setCanvasHeight(aboutUsRef.current.offsetHeight)
    setCanvasWidth(aboutUsRef.current.offsetWidth)
  }, [screenWidth,screenHeight]);
  useEffect(() => {
    if(canvasHeight&&canvasWidth){
      canvas.height=canvasHeight
      canvas.width=canvasWidth
      const ctx = canvas.getContext('2d');
      let circle_1=new Circles(canvasWidth/6,canvasHeight/5 ,100,0,2*Math.PI,window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color'))
      circle_1.drawFill(ctx)
      let circle_2=new Circles(canvasWidth-canvasWidth/10,canvasHeight/4 ,100,0,2*Math.PI,window.getComputedStyle(document.documentElement).getPropertyValue('--third-color'))
      circle_2.drawFill(ctx)
      let circle_3=new Circles(canvasWidth-canvasWidth/5,canvasHeight-canvasHeight/9 ,50,0,2*Math.PI,window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),10)
      circle_3.drawStroke(ctx)
      let line_1=new Line(canvasWidth/19,canvasHeight-canvasHeight/4,canvasWidth/1.5,canvasHeight-canvasHeight/1,window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),2)
      line_1.drawLine(ctx)
      let line_2=new Line(canvasWidth/19,canvasHeight-canvasHeight/2,canvasWidth/1.5,canvasHeight-canvasHeight/10,window.getComputedStyle(document.documentElement).getPropertyValue('--third-color'),5)
      line_2.drawLine(ctx)
      let line_3=new Line(0,0,100,100,window.getComputedStyle(document.documentElement).getPropertyValue('--bold-color'),10)
      line_3.drawLine(ctx)
    }
  }, [canvasHeight,canvasWidth,theme]);
  return (
    <>
      <canvas
        id='myCanvas'
        ref={canvasRef}>
        Your browser does not support the HTML canvas tag.
      </canvas>
      <div className='about-us' ref={aboutUsRef}>
        <div className='content'>
          <h1>ABOUT US</h1>
          <div className="content-wrapper">
            <div className="">
              <h4>Who We Are</h4>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum molestias vitae ipsa aspernatur fugit! Qui, non! Voluptas hic optio iusto voluptatibus. Itaque accusamus eum soluta aliquid dolor cupiditate, nulla doloribus. Similique beatae ut nulla! Sequi exercitationem illum magnam consequatur fuga.</p>  
            </div>
            <div className="">
              <h4>Our Services</h4>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum molestias vitae ipsa aspernatur fugit! Qui, non! Voluptas hic optio iusto voluptatibus. Itaque accusamus eum soluta aliquid dolor cupiditate, nulla doloribus. Similique beatae ut nulla! Sequi exercitationem illum magnam consequatur fuga.</p>  
            </div>
            <div className="">
              <h4>Our Customers</h4>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum molestias vitae ipsa aspernatur fugit! Qui, non! Voluptas hic optio iusto voluptatibus. Itaque accusamus eum soluta aliquid dolor cupiditate, nulla doloribus. Similique beatae ut nulla! Sequi exercitationem illum magnam consequatur fuga.</p>  
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
