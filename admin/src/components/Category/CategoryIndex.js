import { useState, useEffect } from 'react'
import { delete_category, get_categories } from '../../api/api'
import { useHistory } from 'react-router-dom'
import { Container, Table, TableContainer, TableBody, TableRow, TableHead, TableCell, IconButton } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { AddButton } from '../UI/AddButton'
import { PageTitle } from '../UI/PageTitle'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  categoriesHolder: {
    padding: 0,
    margin: 0,
    '&:last-child td': {  // !!! Remove border-bottom of the last row !!!
      borderBottom: 0
    }
  },
  headCell: {
    fontWeight: '800',
    fontSize: 16
  },
  titlesCell: {
    verticalAlign: 'middle'
  },
  categoryTitle: {
    fontSize: 16
  }
}))

export const CategoryIndex = () => {
  const styles = useStyles()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      const fetchedCategories = await get_categories()
      setItems(fetchedCategories)
      setLoading(false)
    }
    fetchCategories()
  }, [])

  const deleteCategoryHandler = async id => {
    await delete_category(id)
    const newCategoryList = items.filter(item => item._id !== id)
    setItems(newCategoryList)
  }

  const categoriesList = items.map(item => (
    <TableRow className={styles.categoriesHolder} key={item._id}>
      <TableCell style={{ verticalAlign: 'middle', margin: 0 }}>
        <span className={styles.categoryTitle}>{item.title_ua}</span>
      </TableCell>
      <TableCell align="right">
        <IconButton 
          color="primary" 
          onClick={() => history.push(`/categories/${(item._id)}`)}>
          <Edit />
        </IconButton>
        <IconButton color="primary" onClick={() => deleteCategoryHandler(item._id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ))

  console.log(items)

  return <>
  { loading ? 
    <div>Loading...</div> 
    : 
    <Container>
      <PageTitle text="Categories" />
      <TableContainer>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.headCell}>Title</TableCell>  
              <TableCell className={styles.headCell} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { categoriesList }
          </TableBody>
        </Table>
      </TableContainer>
      <AddButton 
        text="Add category" 
        variant="contained" 
        color="primary" 
        onClickBtn={() => history.push('/categories/create')} 
      />
    </Container>
  }
  </>
}