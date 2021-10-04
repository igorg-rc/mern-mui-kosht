import { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/styles"
import { NavLink } from "react-router-dom"
import { List, ListItem, Typography } from "@material-ui/core"
import { get_categories, get_contacts, get_tags } from "../../api/api"
import { SectionTitle } from "./Title"

const useStyles = makeStyles(theme => ({
  main: {
  },
  tagList: {
    paddingTop: 0,
    paddingBottom: '3vh'
  },
  tagListItem: {
    padding: '0px 0.2px',
    color: '2E3A59',
    '&:hover': {
      color: theme.palette.primary.main
    },
  },
  liCircle: {
    fontSize: 12,
    marginRight: '5px',
    verticalAlign: 'text-bottom'
  },
  liLattice: {
    marginRight: '5px',
    fontWeight: 500,
    fontSize: 14
  },
  tagLink: {
    padding: '10px',
    color: '#2E3A59',
    width: '100%',
    margin: '0',
    borderRadius: '5px',
    fontSize: 14,
    fontFamily: 'Gilroy, sans-serif',
    textDecoration: 'none',
    '&:hover': {
      color: '#99A5FF'
    //   color: "#fff",
    //   background: '#99A5FF',
    //   transition: '0.3s'
    }
  },
  linkText: {
    fontSize: 14,
    fontWeight: 500,
    color: '',
    fontFamily: 'Play, sans-serif',
  },
  activeNavLink: {
    // background: '#5669FF',
    // color: '#fff'
    color: '#5669FF',
  },
  listItemIcon: {
    width: '20px',
    marginRight: '10px'
  }
}))

export const LeftMenu = () => {
  const styles = useStyles()
  const [categories, setCategories] = useState([])
  const [contacts, setContacts] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const setContent = async () => {
      setLoading(true)
      const contactData = (await get_contacts())
      setContacts(contactData.data)
      setCategories(await get_categories())
      setTags(await get_tags())
      setLoading(false)
    }
    setContent()
  }, [])

  
  return loading ? null : <section className={styles.main}>
    <div className={styles.list}>
      <List className={styles.tagList}>
        { categories && categories.map(item => (
          <ListItem className={styles.tagListItem} key={item._id}>
            <NavLink 
              activeClassName={styles.activeNavLink} 
              to={`/category/${(item.slug)}`} 
              className={styles.tagLink} 
              width={1}
            >
              <Typography className={styles.linkText}>
              { item.imgUrl ? 
              <img 
                src={`/${item.imgUrl}`} 
                alt={item.title} 
                width="20" 
                className={styles.listItemIcon} 
              /> :
                <span className={styles.liCircle}>&#9679;</span> }
                {item.title_ua}
              </Typography>
            </NavLink>
          </ListItem>
        )) }
      </List>
    </div>
    <div className={styles.list}>
      <List className={styles.tagList}>
        { tags.map(item => (
          <ListItem className={styles.tagListItem} key={item._id}>
            <NavLink 
              activeClassName={styles.activeNavLink} 
              to={`/tag/${(item.slug)}`}
              className={styles.tagLink}
            >
              <Typography className={styles.linkText}>
                <span className={styles.liLattice}>#</span>{item.title_ua}
              </Typography>
            </NavLink>
          </ListItem>
        )) }
      </List>
    </div>

    <SectionTitle title="Cлідкуйте за нами" />
    <div className={styles.list}>
      <List className={styles.tagList}>
        { contacts.map(item => (
          <ListItem className={styles.tagListItem} key={item._id}>
            <a 
              href="https://google.com"
              target="_blank"
              className={styles.tagLink}
            >
              <Typography className={styles.linkText}>
              { item.imgUrl ? 
              <img 
                src={`/${item.imgUrl}`} 
                alt={item.title} 
                width="20" 
                className={styles.listItemIcon} 
              /> :
              <span className={styles.liCircle}>&#9679;</span> }
              <span className={styles.liLattice}>{item.title}</span>
              </Typography>
            </a>
          </ListItem>
        )) }
      </List>
    </div>
  </section>
}