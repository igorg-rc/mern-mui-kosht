import { Button } from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  main: {
    marginLeft: 'auto',
    padding: '10px 0',
    textAlign: 'left'
  },
  btnIcon: {
    fontSize: 20,
    padding: '0 5px 0 0',
    verticalAlign: 'middle'
  },
  btnText: {
    fontSize: 16,
  }
}))

export const AddButton = ({ text, color, variant, onClickBtn }) => {
  const styles = useStyles()

  return <div className={styles.main}>
    <Button color={color} variant={variant} className="add_button" onClick={onClickBtn}>
      <AddCircleOutline className={styles.btnIcon} />
      <span className={styles.btnText}>{ text }</span> 
    </Button>
  </div>
}