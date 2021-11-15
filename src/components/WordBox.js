import React, {useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import Speech from 'react-speech';

const WordBox=({word, itemIndex, deleteWord})=>{
  const style = {
    play: {
        hover: {
            backgroundColor: "#0d6efd",
            color: "#fff",
        },
        button: {
            padding: "6px 9px",
            fontSize: "15px",
            Color: '#fff',
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "#0d6efd" ,
            fontWeight: 700,
            border: "none"
        }
    },
    pause: {
        hover: {},
        button: {},
    },
    stop: {
        hover: {},
        button: {},
    },
    resume: {
        hover: {},
        button: {},
    }
  };
          
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className="card m-2" style={{display: "inline-block"}}>
      <div className="card-body" style={{textAlign: "center"}}>
          <div>
              <Speech styles={style} textAsButton={true} displayText={word.en}  text={word.en} /> : <span className="badge bg-primary" style={{padding: "10px", fontSize: "15px"}}> {word.tr} </span> <br/> <span className="badge bg-secondary"> <i className="fas fa-history"></i> {word.searchCount} </span>
          </div>
          <span className="badge bg-danger" style={{marginTop: "10px", cursor:"pointer"}} onClick={handleShow}><i className="far fa-trash-alt"></i></span>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title ><i class="fas fa-exclamation-triangle"></i> Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete the "{word.en}" word?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={()=>{
              deleteWord(itemIndex);
              handleClose();
            }}>
            <i class="fas fa-trash-alt"></i> Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default WordBox;