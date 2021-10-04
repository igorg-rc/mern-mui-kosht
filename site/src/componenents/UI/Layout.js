import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Header } from '../UI/Header'
import { LeftMenu } from './LeftMenu'
import { RightMenu } from './RightMenu'

const useStyles = makeStyles(theme => ({
  // mainContainer: {
  //   maxWidth: '75%'
  // },
  content: {
    background: 'rgb(240, 240, 240)',
    paddingTop: '4vh'
  },
  rightMenuGrid: {
    [theme.breakpoints.down('md')  && theme.breakpoints.up('xs')]: {
      // display: 'none'
    }
  },
  leftMenuGrid: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}))

export const Layout = ({ children }) => {
  const styles = useStyles()

  return <>

    <Header />
    <div className={styles.content}>
      <Container className={styles.mainContainer}>
        <Grid container spacing={1}>
          <Grid item sm={false} md={3} lg={2} className={styles.leftMenuGrid}>
            <LeftMenu />
          </Grid>
          { 
          <Grid item sm={12} md={9} lg={7}>
            {children}
          </Grid>
          }
          <Grid item sm={12} md={3} lg={3} className={styles.rightMenuGrid}>
            <RightMenu />
          </Grid> 
        </Grid>
      </Container>
    </div>
  </>
}
