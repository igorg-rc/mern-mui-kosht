import { AppBar, Toolbar, Container, List, ListItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NavLink, useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  toolbar: {
  },
  navLinksList: {
    display: 'flex',
    marginLeft: 'auto'
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: 18,
    fontWeight: 500,
    fontFamily: 'Play, sans-serif',
    border: '1px solid #fff',
    padding: '5px 10px',
    minWidth: '100%',
    textAlign: 'center',
    borderRadius: '5px',
    background: theme.palette.secondary.main,
    wordWrap: 'normal',
    '&:hover': {
      background: "#fff",
      color: '#303F9F',
      transition: '0.3s'
    },
  },
  activeNavLink: {
    background: 'rgba(0,0,0, 0.2)',
  },
  navLinksItem: {
    '&:hover': {}
  }
}))

export const Header = () => {
  const styles = useStyles()
  const {pathname } = useLocation()

  return <>
    <AppBar position="static">
      <Container>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h5" color="initial">Admin Panel</Typography>
        <List className={styles.navLinksList}>
          <ListItem className={styles.navLinksItem}>
            <NavLink to="/posts" className={styles.navLink} activeClassName={styles.activeNavLink} isActive={() => ['/posts'].includes(pathname)}>Posts</NavLink>
          </ListItem>
          <ListItem className={styles.navLinksItem}>
            <NavLink to="/tags" className={styles.navLink} activeClassName={styles.activeNavLink} isActive={() => ['/tags'].includes(pathname)}>Tags</NavLink>
          </ListItem>
          <ListItem className={styles.navLinksItem}>
            <NavLink to="/categories" className={styles.navLink} activeClassName={styles.activeNavLink} isActive={() => ['/categories'].includes(pathname)}>Categories</NavLink>
          </ListItem>
          <ListItem className={styles.navLinksItem}>
            <NavLink to="/contacts" className={styles.navLink} activeClassName={styles.activeNavLink} isActive={() => ['/contacts'].includes(pathname)}>Contacts</NavLink>
          </ListItem>
          <ListItem className={styles.navLinksItem}>
            <NavLink to="/left-menu" className={styles.navLink} activeClassName={styles.activeNavLink} isActive={() => ['/left-menu'].includes(pathname)}>Left menu</NavLink>
          </ListItem>
        </List>
      </Toolbar>
      </Container>
    </AppBar>
  </>
}