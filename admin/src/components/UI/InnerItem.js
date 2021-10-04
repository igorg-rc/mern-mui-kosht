import { Button, TextField } from '@material-ui/core'
import { makeStyles} from '@material-ui/styles'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  btn: {
    margin: 3,
    textAlign: 'left'
  }
}))

export const InnerItem = props => {
  const { onItemInputChange, onAddItem, onRemoveItem, itemValue, items, placeholder } = props
  
  const styles = useStyles()

  return <>
    <h2>Add {placeholder}: (remove excessive {placeholder} instances from the list by clicking them):</h2>
      <div className="items-input">
        <ul>
          {items && items.map(item => (
            <Button 
              key={item._id}
              variant="contained"
              color="secondary"
              className={styles.btn}
              onClick={id => onRemoveItem(item._id)}
            >
              <span>{item.title_ua}</span>
              <Close />
            </Button>
          )) }
        </ul>
      </div>
      <form onSubmit={onAddItem}>
        <TextField 
          fullWidth 
          placeholder={`Type new ${placeholder} title and press 'ENTER' to create a new ${placeholder}`}
          label={`Create new ${placeholder}`}
          value={itemValue}
          variant="outlined"
          onChange={onItemInputChange}
        />
      </form>
  </>
}