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
          <img className='aboutMePicture' src='/IMG_3989.png' alt='Nathaniel Luffey in front of Alaskan waterfall' draggable='false'/>
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
      height: 500,
      content: (
        <div className='contentContainer'>
          <img className='aboutMePicture' src='/20241204_184638937_iOs.png' alt="Nathaniel Luffey's Server Corner" draggable='false'/>
          <div className='textContainer'>
            <span className='paragraphHeader'>About This Website!</span>
            <span className='paragraphText'>
              This website is a React based portfolio designed to look like the Windows 95 desktop. It was inspired by{' '}
              <a href='https://github.com/Nathaniel-Luffey' target='_blank' rel='noopener noreferrer'>Joe Bergeron's portfolio</a>, which similarly shares a windowed design.<br/><br/>
              The picture on the left is my server corner. Instead of using a cloud provider, I host this website on a 
              desktop PC I built from old, unused parts I had lying around.
              <br/><br/>
              It runs Ubuntu Linux and serves this Dockerized website via Nginx.
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      icon: '/icons/Book.ico',
      textHeader: 'Bookstore Project',
      isOpen: false,
      isMinimized: false,
      width: 600,
      height: 600,
      content: (
        <div className='contentContainer'>
          <div className='textContainer'>
            <span className='paragraphHeader'>My Bookstore App</span>
            <span className='paragraphText'>
              I built a full-stack web app that allows users to browse, search, and order books. The backend is built with Node.js and Express, connecting to a MySQL database 
              where the book records, users, and orders are stored. On the front end, I used React Native (with web support).<br/><br/>
              <strong>Key Features:</strong>
              <ul>
                <li><em>Robust Search:</em> Look up books by title, author, publisher, or language.</li>
                <li><em>Sorting & Filtering:</em> Sort results by publication year or rating.</li>
                <li><em>User Accounts:</em> Log in, register, and view individual user profiles.</li>
                <li><em>Comments & Ratings:</em> Add comments to books and vote on usefulness.</li>
                <li><em>Manager Dashboard:</em> Special permissions to add new books, grant manager status, and view top sellers.</li>
              </ul>
              Feel free to explore the code and adapt it for your own projects! GitHub link <a href='https://github.com/Nathaniel-Luffey/bookstore-webapp' target='_blank' rel='noopener noreferrer'>here</a>.
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      icon: '/icons/Projector.ico',
      textHeader: 'Cloud Storage Project',
      isOpen: false,
      isMinimized: false,
      width: 700,
      height: 700,
      content: (
        <div className='contentContainer'>
          <img className='cloudPhotoPicture' src='/20241204_042907000_iOs.png' alt="Nathaniel Luffey's Cloud Storage App" draggable='false'/>
          <div className='textContainer'>
            <span className='paragraphHeader'>Cloud Storage App Overview</span>
            <span className='paragraphText'>
            This project is a personal cloud photo storage system that integrates a custom server (built with Django and Python) and a React Native client application.<br/><br/>
            I host the Django backend on my personal server (the same machine that runs this website). The React Native client uses the server’s local IP address to communicate with the API endpoints, but you can also expose this publicly with proper port-forwarding.<br/><br/>
            I built this system primarily to avoid the monthly fees for commercial cloud providers. Eventually I plan to intergrate video functionality and maybe some other file types too.<br/><br/>
            If this seems useful for anything you need feel free to pull it from GitHub <a href='https://github.com/Nathaniel-Luffey/Mobile-Cloud-Photo-Backup-App' target='_blank' rel='noopener noreferrer'>here</a>.
            </span>
          </div>
        </div>
      ),
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