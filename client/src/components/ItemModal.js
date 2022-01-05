import { 
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { useDispatch } from 'react-redux'
import { addItem } from "../features/item"
import { useState } from 'react'

const ItemModal = () => {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ name, setName ] = useState('')
  const dispatch = useDispatch() 

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const onChange = (e) => {
    setName(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: name
    }

    // Add item via addItem action
    dispatch(addItem({item: newItem}))

    // Close Modal
    toggle();

  }

  return (
    <div>
      <Button
        color="dark"
        style={{marginBottom: "2rem"}}
        onClick={toggle}
      >Add Item
      </Button>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input 
                type="text"
                id="item"
                placeHolder="Add Shopping Item"
                onChange={onChange}
              />
              <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
              >
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ItemModal
