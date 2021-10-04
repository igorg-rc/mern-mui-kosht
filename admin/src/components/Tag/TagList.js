import { Button, TextField } from '@material-ui/core'
import { makeStyles} from '@material-ui/styles'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  btn: {
    margin: 3,
    textAlign: 'left'
  }
}))

export const TagList = props => {
  const { onTagInputChange, onAddTag, onRemoveTag, tagValue, tags } = props
  
  const styles = useStyles()

  return <>
    <h2>Add tags (all tags from the list will be added to the post):</h2>
      <div className="tags-input">
        <ul>
          {tags && tags.map(item => (
            <Button 
              key={item._id}
              variant="contained"
              color="secondary"
              className={styles.btn}
              onClick={id => onRemoveTag(item._id)}
            >
              <span>{item.title}</span>
              <Close />
            </Button>
          )) }
        </ul>
      </div>
      <form onSubmit={onAddTag}>
        <TextField 
          fullWidth 
          placeholder="Type new tag title and press 'ENTER' to create a new tag" 
          label="Create new tag"
          variant="outlined"
          value={tagValue}
          onChange={onTagInputChange}
        />
      </form>
  </>
}