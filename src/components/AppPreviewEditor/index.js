import React, { useEffect, useRef } from 'react';
import './index.style.scss'
const AppPreviewCode = ({ html, css, js }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const doc = iframeRef.current.contentDocument;
    doc.open();
    doc.write(`
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `);
    doc.close();
  }, [html, css, js]);

  return <iframe ref={iframeRef} title="preview" className='preview-code' />;
};

export default AppPreviewCode;
