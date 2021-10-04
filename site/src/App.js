import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ThemeProvider, createTheme } from '@material-ui/core'
import { Layout } from './componenents/UI/Layout'
import { PostList } from './pages/PostList'
import { PostSearch } from './pages/PostSearch'
import { PostCategoryIndex } from './componenents/Post/PostCategoryIndex'
import { PostTagIndex } from './componenents/Post/PostTagIndex'
import { PostDetail } from './pages/PostDetail'
import { CurrencyFull } from './componenents/Currency/CurrencyFull'
import SimpleReactLightbox from "simple-react-lightbox";
import './App.css'

const siteTheme = createTheme({
  palette: {
    text: {
      primary: '#2E3A59',
      secondary: '#5669FF'
    }
  }
})

const App = () => {
  return (
    <>
    <Helmet>
      <title>Kosht | We speak about your finances</title>
      <meta name="description" content="All information about banks and finance strategies." />
    </Helmet>
    <div className="App">
      <SimpleReactLightbox>
        <Router>
          <ThemeProvider theme={siteTheme}>
            <Layout>
              <Switch>
                <Route path="/" exact component={PostList} />
                <Route path="/search/:query" component={PostSearch} />
                <Route path="/category/:slug" component={PostCategoryIndex} />
                <Route path="/tag/:slug" component={PostTagIndex} />
                <Route path="/:slug" component={PostDetail} />
                <Route path="/currency/:date" component={CurrencyFull} />
                {/* <Route path="/:id" component={PostDetail} /> */}
              </Switch>
            </Layout>
          </ThemeProvider>
        </Router>
      </SimpleReactLightbox>
    </div>
    </>
  )
}

export default App