import './App.css';
import { useState } from 'react';
import Window from "./Window";

function App() {
  const [windows, setWindows] = useState([
    {
      id: 1,
      icon: '/icons/Notepad document.ico',
      textHeader: 'About Me',
      isOpen: true,
      isMinimized: false,
      width: 600,
      height: 600,
      content: (
        <div className='contentContainer'>
          <img className='aboutMePicture' src='/IMG_3989.png' alt='Nathaniel in front of a waterfall' draggable='false'/>
          <div className='textContainer'>
            <span className='paragraphHeader'>Hello!</span>
            <span className='paragraphText'>
              Welcome to my website! My name is Nathaniel Luffey and I'm a senior computer science student at Penn State. I currently work at Fresenius Kabi (Warrendale, PA) as an Associate Application Specialist.
              My tasks there are a combination of development and project management.<br/><br/>I plan on attending Georgia Tech's OMSCS program this fall to get my master's in computer science (application pending).
              <br/><br/>Feel free to check out my{' '}
              <a href='https://github.com/Nathaniel-Luffey' target='_blank' rel='noopener noreferrer'>GitHub</a> and connect with me on{' '}
              <a href='https://www.linkedin.com/in/nathaniel-luffey-395140191/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>!
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      icon: '/icons/Web-Document.ico',
      textHeader: 'This Website',
      isOpen: false,
      isMinimized: false,
      width: 600,
      height: 600,
      content: <div className='contentContainer'>Details about the creation of this website...</div>,
    },
    {
      id: 3,
      icon: '/icons/Book.ico',
      textHeader: 'Bookstore Project',
      isOpen: false,
      isMinimized: false,
      width: 600,
      height: 600,
      content: <div className='contentContainer'>Details about my bookstore project...</div>,
    },
    {
      id: 4,
      icon: '/icons/Projector.ico',
      textHeader: 'Cloud Storage Project',
      isOpen: false,
      isMinimized: false,
      width: 600,
      height: 600,
      content: <div className='contentContainer'>Details about my mobile cloud photo storage project...</div>,
    },
  ]);
  const [zAxis, setZAxis] = useState(windows.map(win => win.id));

  const bringToFront = (id) => {
    setZAxis((prevZAxis) => [...prevZAxis.filter(winId => winId !== id), id]);
  };

  const toggleMinimize = (id) => {
    setWindows((prevWindows) => prevWindows.map((win) => win.id === id ? { ...win, isMinimized: !win.isMinimized } : win));
  };

  const exitWindow = (id) => {
    setWindows((prevWindows) => prevWindows.map((win) => win.id === id ? { ...win, isOpen: false } : win));
  };

  return (
    <main>
      {windows.map((win) => 
        win.isOpen && !win.isMinimized ? (
          <Window key={win.id} 
          icon={win.icon} 
          textHeader={win.textHeader} 
          content={win.content} 
          zIndex={zAxis.indexOf(win.id)} 
          onClick={() => bringToFront(win.id)}
          onMinimize={() => toggleMinimize(win.id)}
          onExit={() => exitWindow(win.id)}
          width={win.width}
          height={win.height}
          />
        ) : null
      )}
      <div className='desktopIconContainer'>
        <div className='desktopIconTextGroup' onClick={() => {setWindows((prevWindows) => prevWindows.map((win) => win.id === 1 ? {...win, isOpen: true} : win)); bringToFront(1)}}>
          <img className='desktopIcon' src='/icons/Notepad document.ico' alt='Notepad Document' style={{ marginBottom: `9px` }}/>
          <span className='desktopIconText'>About Me</span>
        </div>
        <div className='desktopIconTextGroup' onClick={() => {setWindows((prevWindows) => prevWindows.map((win) => win.id === 2 ? {...win, isOpen: true} : win)); bringToFront(2)}}>
          <img className='desktopIcon' src='/icons/Web-Document.ico' alt='Web Document Icon' style={{ marginBottom: `10px`, marginTop: `13px`}}/>
          <span className='desktopIconText'>This Website</span>
        </div>
        <div className='desktopIconTextGroup' onClick={() => {setWindows((prevWindows) => prevWindows.map((win) => win.id === 3 ? {...win, isOpen: true} : win)); bringToFront(3)}}>
          <img className='desktopIcon' src='/icons/Book.ico' alt='Book Icon'/>
          <span className='desktopIconText'>Bookstore Project</span>
        </div>
        <div className='desktopIconTextGroup' onClick={() => {setWindows((prevWindows) => prevWindows.map((win) => win.id === 4 ? {...win, isOpen: true} : win)); bringToFront(4)}}>
          <img className='desktopIcon' src='/icons/Projector.ico' alt='Projector Icon'/>
          <span className='desktopIconText'>Cloud Storage Project</span>
        </div>
      </div>
      <div className='taskBar'>
        <div className='startBox'>
          <img className='windowIcon' src='/icons/Windows logo (without text).ico' alt='Windows Logo'/>
          <span className='startText'>Start</span>
        </div>
          {windows.map((win) => {
            const isTopWindow = zAxis[zAxis.length - 1] === win.id;

            return win.isOpen && (
              win.isOpen && (
                <button className={`${isTopWindow ? 'activeMinimizedButton' : 'minimizedButton'}`} key={win.id} onClick={() => {setWindows((prevWindows) => prevWindows.map((window) => window.id === win.id ? {...window, isMinimized: false} : window)); bringToFront(win.id)}}>
                  <img className='minimizedIcon' src={win.icon} alt={win.textHeader}/>
                  {win.textHeader}
                </button>
              )
            )
          })}
      </div>
    </main>
  );
};

export default App;