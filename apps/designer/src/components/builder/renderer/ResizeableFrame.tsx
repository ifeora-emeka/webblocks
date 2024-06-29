import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { Resizable } from 're-resizable';

const ResizableIframe: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Resizable

      defaultSize={{
        width: '100%',
        height: 600, // Fixed height
      }}
      // minWidth={300} // Minimum width
      maxWidth={'100%'} // Maximum width
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
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
          cursor: 'ew-resize'
        }
      }}
    >
      <Frame width="100%" height="600px" className="bg-white min-h-[calc(100vh-50px)]">
        <FrameContextConsumer>
          {({ document, window }) => (
            <>
              {/*This renders the website being built*/}
              {children}
            </>
          )}
        </FrameContextConsumer>
      </Frame>
    </Resizable>
  );
};

export default ResizableIframe;
