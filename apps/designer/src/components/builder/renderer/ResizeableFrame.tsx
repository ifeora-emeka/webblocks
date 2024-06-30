import React, { useEffect, useState } from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { Resizable } from 're-resizable';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  responsiveBox: {
    height: '400px',
    '@media (max-width: 600px)': {
      backgroundColor: 'lightblue',
    },
    '@media (min-width: 601px) and (max-width: 1200px)': {
      backgroundColor: 'lightgreen',
    },
    '@media (min-width: 1201px)': {
      backgroundColor: 'lightcoral',
    },
  },
});

const ResizableIframe: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setShow(true);
  }, []);

  const CustomHead = () => {
    return (
      <>
        <meta charSet="utf-8" />
        <title>Previewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <base target="_parent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'} />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </>
    );
  };

  if (!show) {
    return null;
  }

  return (
    <Resizable
      defaultSize={{
        width: '100%',
        height: 600, // Fixed height
      }}
      maxWidth={'100%'} // Maximum width
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      handleStyles={{
        right: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '5px',
          height: '100%',
          right: '0px',
          backgroundColor: 'var(--primary)',
          cursor: 'ew-resize',
        },
      }}
    >
      <Frame width="100%" height="600px" className="bg-white min-h-[calc(100vh-50px)]" head={<CustomHead />} id="site-frame">
        <FrameContextConsumer>
          {({ document, window }) => {
            return (
              <>
                <div id="responsive-box" className={classes.responsiveBox}></div>
                {children}
              </>
            );
          }}
        </FrameContextConsumer>
      </Frame>
    </Resizable>
  );
};

export default ResizableIframe;
