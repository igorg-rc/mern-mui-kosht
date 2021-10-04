import { Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  main: {
    padding: '20px 0',
  },
  text: {
    fontFamily: 'Play'
  }
}))

export const PageTitle = ({ text }) => {
  const styles = useStyles() 

  return <div className={styles.main}>
    <Typography variant="h4" className={styles.text}>{ text }</Typography>
  </div>
}