import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'left',
    paddingBottom: '2vh',
    fontSize: 18,
    fontWeight: 800,
    color: theme.palette.text.primary,
    fontFamily: 'Gilroy, sans-serif',
  }
}))


export const SectionTitle = ({ title }) => {
  const styles = useStyles()
  return <Typography className={styles.title} variant="h1" component="h1">{title}</Typography>
}