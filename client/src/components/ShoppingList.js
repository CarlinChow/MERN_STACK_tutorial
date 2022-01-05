import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getItems, deleteItem } from "../features/item"

const ShoppingList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const items = useSelector(state => state.item.value.items)

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({_id, name}) => (
              <CSSTransition key={_id} timeout={200} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="small"
                    onClick={() => {
                      dispatch(deleteItem({id: _id}))
                    }}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
}

export default ShoppingList
