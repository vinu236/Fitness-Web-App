import { useState, Fragment } from "react";
import { Alert } from "@material-tailwind/react";
 
export default function Colors({text,className}) {
  const [show, setShow] = useState(true);
 
  return (
    <Fragment>
      <Alert
        className={className}
        
        show={show}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        dismissible={{
          onClose: () => setShow(false),
        }}
      >
       {text}
      </Alert>
    </Fragment>
  );
}