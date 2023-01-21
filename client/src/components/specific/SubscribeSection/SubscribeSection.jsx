/** @format */

import Input from 'components/common/Input/Input';
import './subscribeSection.scss';
import Button from 'components/common/Button/Button';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Box from 'components/common/Box/Box';
import Circles from 'models/CanvasClasses/Circles';
import Line from 'models/CanvasClasses/Line';
import { useSelector } from 'react-redux';

const SubscribeSection = () => {
    const [email,setEmail]=useState()
    const canvasRef = useRef();
    const wrapperRef = useRef();
    const [canvasHeight,setCanvasHeight]=useState()
    const [canvasWidth,setCanvasWidth]=useState()
    const screenWidth=useSelector(state=>state.screenSize.screenWidth)
  const screenHeight=useSelector(state=>state.screenSize.screenHeight)
    const theme=useSelector(state=>state.theme.theme)
    let canvas = canvasRef.current;
    useEffect(() => {
      setCanvasHeight(wrapperRef.current.offsetHeight)
      setCanvasWidth(wrapperRef.current.offsetWidth)

    }, []);
    useEffect(() => {
      setCanvasHeight(wrapperRef.current.offsetHeight)
      setCanvasWidth(wrapperRef.current.offsetWidth)
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
        let circle_4=new Circles(canvasWidth/2,canvasHeight/2 ,300,0,2*Math.PI,window.getComputedStyle(document.documentElement).getPropertyValue('--third-color'))
        circle_4.drawFill(ctx)
        let circle_5=new Circles(canvasWidth/2,canvasHeight/2 ,250,0,2*Math.PI,window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color'))
        circle_5.drawFill(ctx)
        let circle_6=new Circles(canvasWidth/2,canvasHeight/2 ,200,0,2*Math.PI,window.getComputedStyle(document.documentElement).getPropertyValue('--third-color'))
        circle_6.drawFill(ctx)
        let circle_7=new Circles(canvasWidth/2,canvasHeight/2 ,150,0,2*Math.PI,window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color'))
        circle_7.drawFill(ctx)
        let circle_8=new Circles(canvasWidth/2,canvasHeight/2 ,100,0,2*Math.PI,window.getComputedStyle(document.documentElement).getPropertyValue('--third-color'))
        circle_8.drawFill(ctx)
        let line_1=new Line(canvasWidth/19,canvasHeight-canvasHeight/4,canvasWidth/1.5,canvasHeight-canvasHeight/1,window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),2)
        line_1.drawLine(ctx)
        let line_2=new Line(canvasWidth/19,canvasHeight-canvasHeight/2,canvasWidth/1.5,canvasHeight-canvasHeight/10,window.getComputedStyle(document.documentElement).getPropertyValue('--third-color'),5)
        line_2.drawLine(ctx)
        let line_3=new Line(0,0,100,100,window.getComputedStyle(document.documentElement).getPropertyValue('--bold-color'),10)
        line_3.drawLine(ctx)
      }
    }, [canvasHeight,canvasWidth,theme]);
    const handleSubscribeBtn=async()=>{
        try {
            const {data}=await axios.post("/v1/newsletter",{newsletterEmail:email})
            console.log(data);
            setEmail("Thanks for subscription")
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div ref={wrapperRef} className='subscribe-section bg-primary-opacity position-relative d-flex justify-content-center align-items-center'>
      <canvas
        id='Canvas'
      
        ref={canvasRef}>
        Your browser does not support the HTML canvas tag.
      </canvas>
      <Box classes="subscribe-box bg-secondary-ofwood">
      <h2 className='subscribe-title'>Get new products to your inbox</h2>
      <div className="subscribe-section-input-wrapper d-flex gap-3 w-75">
        <Input placeholder="Subscribe" onchange={(ev)=>{setEmail(ev.target.value)}} value={email} classes="bg-secondary-ofwood"/>
        <Button onclick={handleSubscribeBtn} classes="primary-button">Subscribe</Button>
      </div>
      </Box>
    </div>
  );
};

export default SubscribeSection;
