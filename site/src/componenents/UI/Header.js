import SearchIcon from "@material-ui/icons/Search"
import MenuIcon from '@material-ui/icons/Menu'
import { useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useTheme} from "@material-ui/styles"
import { LeftMenu } from './LeftMenu'
import { makeStyles } from "@material-ui/styles"
import { 
  TextField, 
  useMediaQuery, 
  AppBar,
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Modal, 
  Backdrop, 
  Fade 
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: '#fff',
    borderTop: '1px solid rgba(0,0,0, 0.3)',
    borderBottom: '1px solid rgba(0,0,0, 0.3)',
  },
  toolbar: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  brandLink: {
    padding: '5px 20px',
    marginLeft: 0,
    fontWeight: 700,
    fontSize: 15,
    background: '#2E3A59',
    color: "#fff", 
    '&:hover': {
      background: '#333333'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '5px 50px',
      margin: '0 auto 0 3px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '5px 50px',
      margin: '0 auto'
    },
  },
  brandPhrase: {
    fontSize: 22,
    fontWeight: 800,
    fontFamily: 'Play, sans-serif',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchInput: {
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('xs')]:{
      display: 'none'
    }
  },
  searchBtn: {
    padding: '5px 10px',
    minWidth: 35,
    marginLeft: '5px'
  },
  mobileBtn: {
    padding: '6px 9px 6px 9px',
    minWidth: 0
  },
  modalMenu: {
    display: 'flex',
    alignItems: 'space-between',
    justifyContent: 'flex-start',
  },
  paperMenu: {
    height: '100vh',
    width: '40vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalSearch: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%'
  },
  paperSearch: {
    width: '100vw',
    paddingBottom: '20px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mobileSearch: {
    textAlign: 'center',
  }
}))

export const Header = () => {
  const styles = useStyles()
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [query, setQuery] = useState("")
  const history = useHistory()
  const theme = useTheme()
  const isSM = useMediaQuery(theme.breakpoints.down('sm'))
  const searchInputRef = useRef()

  const onSearchChange = query => setQuery(query)
  const handleMenuOpen    = () => setOpenMenu(true)
  const handleMenuClose   = () => setOpenMenu(false)
  const handleSearchOpen  = () => setOpenSearch(true)
  const handleSearchClose = () => setOpenSearch(false)

  const handleSearch = () => {
    query ? history.push(`/search/${query}`) : history.push(`/`)
    setQuery("")
  }


  return <> { 
    !isSM 
    ? 
    <div className={styles.root}>
      <AppBar position="static" elevation={0} className={styles.appBar}>
        <Container className={styles.mainContainer}>
          <Toolbar className={styles.toolbar}>
            <Button  variant="contained" onClick={() => history.push("/")} className={styles.brandLink}>Kosht</Button>
            <Typography variant="h1" component="h1" className={styles.brandPhrase}>Розповідаємо про особисті фінанси</Typography>
            <div className={styles.search}>
              <TextField 
                variant="outlined" 
                placeholder="Search" 
                inputProps={{ style: { padding: '7.5px', margin: '0 2px'  } }}
                onChange={e => onSearchChange(e.target.value)}
                value={query}
                ref={searchInputRef}
              />
              <Button 
                id="search-menu-button" 
                variant="contained" 
                color="primary" 
                className={styles.searchBtn}
                onClick={handleSearch}
                >
                <SearchIcon />
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div> 
    : 
    <div className={styles.root}>
      <AppBar position="static" elevation={0} className={styles.appBar}>
        <Container>
          <Toolbar className={styles.toolbar}>
            <Button  variant="contained" color="primary" onClick={handleMenuOpen} className={styles.mobileBtn}>
              <MenuIcon />
            </Button>
            <Button  variant="contained" color="primary" onClick={() => history.push("/")} className={styles.brandLink}>Кошт</Button>
            <div className={styles.search}>
              <Button 
                variant="contained" 
                color="primary" 
                className={styles.mobileBtn} 
                style={{ marginLeft: '3px' }} 
                onClick={handleSearchOpen}>
                <SearchIcon />
              </Button>
            </div>
          </Toolbar>
          <Modal
            aria-labelledby="menu-modal-title"
            aria-describedby="menu-modal-description"
            className={styles.modalMenu}
            open={openMenu}
            onClose={handleMenuClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
          >
            <Fade in={openMenu}>
              <div className={styles.paperMenu}>
                <LeftMenu />
              </div>
            </Fade>
          </Modal>
          <Modal
            aria-labelledby="search-modal-title"
            aria-describedby="search-modal-description"
            className={styles.modalSearch}
            open={openSearch}
            onClose={handleSearchClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
          >
            <Fade in={openSearch}>
              <div className={styles.paperSearch}>
                <div className={styles.mobileSearch}>
                  <TextField 
                    variant="outlined" 
                    placeholder="Search" 
                    inputProps={{ style: { padding: '7.5px', margin: '0 2px', width: '60vw'  } }}
                    value={query}
                    onChange={e => onSearchChange(e.target.value)}
                  />
                  <Button 
                    id="search-menu-button" 
                    variant="contained" 
                    color="primary" 
                    className={styles.searchBtn}
                    onClick={handleSearch}
                    >
                    Find
                  </Button>
                </div>
              </div>
            </Fade>
          </Modal>
        </Container>
      </AppBar>
    </div> 
    }
  </>
}