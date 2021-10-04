import { TextField, Container, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/styles'
import { SendButton } from "./SendButton"
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  form: {
    padding: '10px 0'
  },
  fileInput: {
    margin: '10px 0'
  },
  textInput: {
    marginBottom: 10
  }
}))

export const SimpleForm = props => {
  const { 
    title_ua, 
    title_en, 
    image, 
    onTitleOneInputChange, 
    onTitleTwoInputChange,
    onFileInputChange,
    onFormSubmit
  } = props

  const styles = useStyles()
  const location = useLocation()

  return <>
    <Container>
      <form 
        className={styles.form} 
        onSubmit={onFormSubmit} 
        encType={ 
          (location.pathname).includes('tags') ? 
          "application/x-www-form-urlencoded"  : "multipart/form-data"  
        }
      >
        <TextField 
          variant="outlined"
          fullWidth
          defaultValue={title_ua}
          onChange={onTitleOneInputChange} 
          label="Title (Ukrainian)"
          className={styles.textInput}
        />
        <TextField 
          variant="outlined"
          fullWidth
          defaultValue={title_en}
          onChange={onTitleTwoInputChange} 
          label="Title (English)"
          className={styles.textInput}
        />
        <Button
          variant="contained"
          component="label"
          className={styles.fileInput}
          style={{ 
            margin: '10px 0', 
            display: (location.pathname).includes("tags")  ?
            "none"  : "inline-block" 
          }}
        >Choose File
          <input 
            type="file" 
            name="image" 
            hidden 
            onChange={onFileInputChange} 
            defaultValue={image} />
        </Button>
        <SendButton 
          text="Submit" 
          type="submit" 
          color="primary" 
          variant="contained" 
        />
      </form>
    </Container>
  </>
}