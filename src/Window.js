import './App.css';
import { useState, useRef, useEffect } from 'react';

function Window({ icon, textHeader, content, zIndex, onClick, onMinimize, onExit, width, height }) {

  const [isDragging, setIsDragging] = useState(false);
  const [windowSize, setWindowSize] = useState({width: width, height: height});
  const [position, setPosition] = useState({x: (window.innerWidth / 2) - (windowSize.width / 2), y: (window.innerHeight / 2) - (windowSize.height / 2)});
  const [isMaximized, setIsMaximized] = useState(false);
  const [defaultWindowSize] = useState({width: width, height: height});
  const offset = useRef({x: 0, y: 0});

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const onMouseMove = (e) => {
      let X = e.clientX - offset.current.x;
      let Y = e.clientY - offset.current.y;
  
      if (X < 0) {
        X = 0;
      }
  
      if (Y < 0) {
        Y = 0;
      }
  
      if (X + windowSize.width > window.innerWidth - 3) {
        X = window.innerWidth - windowSize.width - 3;
      }
  
      if (Y + windowSize.height > window.innerHeight - 40) {
        Y = window.innerHeight - windowSize.height - 40;
      }
       
      setPosition({x: X, y: Y});
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, windowSize.width, windowSize.height]);

  const onMouseDown = (e) => {
    setIsDragging(true);
    offset.current = {x: e.clientX - position.x, y: e.clientY - position.y};
  };

  const onPressMaximize = () => {
    if (isMaximized) {
      setWindowSize({width: defaultWindowSize.width, height: defaultWindowSize.height});
    }
    else {
      setWindowSize({height: window.innerHeight - 2, width: window.innerWidth - 2});
    }

    setIsMaximized(!isMaximized);
  };

  return (
    <div className='window' onMouseDown={onClick} style={{ zIndex: zIndex + 1, width: `${windowSize.width}px`, height: `${windowSize.height}px`, left: isMaximized ? '0px' : `${position.x}px`, top: isMaximized ? '0px' : `${position.y}px`}}>
      <div className='topBar' onMouseDown={onMouseDown}>
        <div className='textHeaderContainer'>
          <img className='icon' src={icon} alt='Notepad document' draggable='false'/>
          <span className='textHeader'>{textHeader}</span>
        </div>
        <div className='titleBarButtonContainer'>
          <img className='titleBarButtons' src='/icons/minimize.png' alt='Minimize Icon' draggable='false' onClick={onMinimize}/>
          <img className='titleBarButtons' src='/icons/full_screen.png' alt='Full Screen Icon' draggable='false' onClick={onPressMaximize}/>
          <img className='titleBarButtons' src='/icons/exit.png' alt='Exit Icon' draggable='false' onClick={onExit}/>
        </div>
      </div>
      <div className='contentContainer'>
        {content}
      </div>
    </div>
  );
};

export default Window;