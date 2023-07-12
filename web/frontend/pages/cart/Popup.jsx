import React from 'react';

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        {/* <svg width="11" height="9" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity='1' fill='%23666E6E' d='M35.6 34.4L28 26.8l7.6-7.6c.2-.2.2-.5 0-.7l-.5-.5c-.2-.2-.5-.2-.7 0l-7.6 7.6-7.5-7.6c-.2-.2-.5-.2-.7 0l-.6.6c-.2.2-.2.5 0 .7l7.6 7.6-7.6 7.5c-.2.2-.2.5 0 .7l.5.5c.2.2.5.2.7 0l7.6-7.6 7.6 7.6c.2.2.5.2.7 0l.5-.5c.2-.2.2-.5 0-.7z'/></svg> */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
