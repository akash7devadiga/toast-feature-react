import { useRef, useState } from "react"

const ToastContainer = () => {
  const timersRef = useRef({});
  const [toasts, setToasts] = useState([]);

  const handleClose = (id) => {

    clearTimeout(timersRef.current[id]);

    delete timersRef.current[id];

    setToasts((prevToast) => {
      let updatedToasts = prevToast.filter((toast) => {
        return toast.id !== id;
      });
      return updatedToasts;
    });
  }

  const handleAdd = (message, type) => {
    const id = new Date().getTime();
    const newToast = [...toasts, { id, message, type }];
    setToasts(newToast);
    timersRef.current[id] = setTimeout(() => handleClose(id), 5000);

  }



  return (
    <div className="container">
      <div className="toast-container">
        {
          toasts.map(({ id, message, type }) => (
            <div id={id} className={`toast ${type}`}>
              {message} <span onClick={() => handleClose(id)}>✖️</span>
            </div>

          ))


        }


      </div>
      <div className="btn-container">
        <button onClick={() => handleAdd("Success toast", "success")} className="success-btn">Success toast</button>
        <button onClick={() => handleAdd("Info toast", "info")} className="info-btn">Info toast</button>
        <button onClick={() => handleAdd("Warning toast", "warning")} className="warning-btn">Warning toast</button>
        <button onClick={() => handleAdd("Error toast", "error")} className="error-btn">Error toast</button>
      </div>
    </div>
  )
}
export default ToastContainer