import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { currenciesGeneralList } from "../../files/data/mocData"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { get_list_by_id } from "../../api/api"
import { PostSeparateListIndex } from "../PostList/PostSeparateListIndex"

const useStyles = makeStyles(theme => ({
  main: {
    background: '#fff',
    minHeight: '10vh',
    border: '1px solid rgb(0,0,0, 0.15)',
    borderRadius: '5px',
    '&:hover': {
      cursor: 'pointer'
    },
    paddingTop: '10px',
    marginBottom: '10px'
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Play, sans-serif',
    fontWeight: 800,
    paddingBottom: 5
  },
  currenciesList: {
    textAlign: 'left',
    padding: '0',
    margin: '0 0 0 10px',
    fontSize: 14,
    fontFamily: 'Play, sans-serif'
  },
  linkToCurrencies: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '0 0 0 10px',
    fontSize: 14,
    paddingTop: 3,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  linkText: {
    fontWeight: 600,
    fontFamily: 'Play, sans-serif',
    '&:hover': {
      textDecoration: 'underline'
    },
    postTitleDiv: {
      border: '1px solid rgb(0,0,0, 0.15)',
      background: 'red',
      backgroundColor: 'darkgreen', 
      margin: 0, 
      padding: 0
    },
  },
  arrowIcon: {
    fontSize: 17
  }
}))

export const RightMenu = () => {
  const styles = useStyles()
  const history = useHistory()
  const [currencies, setCurrencies] = useState([])
  const [articles, setArticles] = useState([{}])
  const [loading, setLoading] = useState(false)
  // const ARTICLES_LIST_ID = `61519f1a15aab64864e59c7c`
  // const OPEN_MINFIN_API_KEY_LINK = "https://api.minfin.com.ua/nbu/80d67dd083c09d9b5a45cfa8539265f67f3dde89"
  // const [data, setData] = useState([])
  
  // useEffect(() => {
  //   const setContent = async () => {
  //     setLoading(true)
  //     setCurrencies(currenciesGeneralList)
  //     const fetchedList = await get_list_by_id(ARTICLES_LIST_ID)
  //     const articlesList = fetchedList[0].posts
  //     setArticles(articlesList)
  //     setLoading(false)
  //   }
  //   setContent()
  // }, [ARTICLES_LIST_ID])

  console.log(currencies)
  console.log(articles[0].posts)

  return loading ? null : <> 
    <section className={styles.main} onClick={() => history.push('/currency/25.07.21')}>
      <Typography variant="h3" component="h3" className={styles.sectionTitle}>Курси валют на 25.07.2021</Typography>
      { currencies.map(item => (
        <Typography 
          paragraph
          key={item.title} 
          className={styles.currenciesList} 
        >{item.title}: <span>{item.byeRate} / {item.sellRate}</span> 
        </Typography>
      )) }
      <div>
        <Typography className={styles.linkToCurrencies} paragraph color="primary">
          <span className={styles.linkText}>Детальніше</span><ArrowForwardIcon className={styles.arrowIcon} />
        </Typography>
      </div>
    </section>
    <PostSeparateListIndex label="Editor board choice" items={articles} />
  </>
}