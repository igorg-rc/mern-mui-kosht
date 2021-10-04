import { Button, TextField } from '@material-ui/core'
import { makeStyles} from '@material-ui/styles'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  btn: {
    margin: 3,
    textAlign: 'left'
  }
}))

export const CategoryList = props => {
  const { onTagInputChange, onAddTag, onRemoveTag, tagValue, categories } = props
  
  const styles = useStyles()

  return <>
    <h2>Add categories (all categories from the list will be added to the post):</h2>
      <div className="categories-input">
        <ul>
          {categories && categories.map(item => (
            <Button 
              key={item._id}
              variant="contained"
              color="secondary"
              className={styles.btn}
              onClick={id => onRemoveTag(item._id)}
            >
              <span>{item.title_ua}</span>
              <Close />
            </Button>
          )) }
        </ul>
      </div>
      <form onSubmit={onAddTag}>
        <TextField 
          fullWidth 
          placeholder="Type new category title and press 'ENTER' to create a new category" 
          label="Create new category"
          value={tagValue}
          variant="outlined"
          onChange={onTagInputChange}
        />
      </form>
  </>
}