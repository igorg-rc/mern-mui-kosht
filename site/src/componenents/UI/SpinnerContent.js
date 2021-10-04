import { ScaleLoader } from "react-spinners"
import { makeStyles } from "@material-ui/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  main: {

  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 20
  }
}))


export const SpinnerContent = ({ loadingStatus }) => {
  const styles = useStyles()

  return <div className={styles.main}>
    <Typography variant="h3" component="h3" className={styles.title}>Loading</Typography>
    <ScaleLoader 
      loading={loadingStatus} 
      height={50}
      width={5}
      radius={0}
      margin={5}
      color={'#2E3A59'}
      className="page-loading-spinner" 
    />
  </div>
}