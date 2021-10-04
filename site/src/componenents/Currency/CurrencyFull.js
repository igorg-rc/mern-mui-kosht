import { currenciesDetailList } from "../../files/data/mocData"
import { makeStyles } from "@material-ui/styles"
import { useEffect, useState } from "react"
import { Grid, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  main: {
    background: '#fff',
    border: '1px solid rgba(0,0,0, 0.15)',
    borderRadius: '5px',
    padding: '10px'
  },
  currenciesHeader: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Play, sans-serif',
    fontWeight: 600
  },
  currenciesValues: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Play, sans-serif',
    fontWeight: 500
  }
}))

export const CurrencyFull = () => {
  const styles = useStyles()
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    setCurrencies(currenciesDetailList)
  }, [])

  console.log(currencies)

  return <div className={styles.main}>
    <Grid container spacing={1}>
        
    <Grid item xs={4}>
        <Typography className={styles.currenciesHeader}>Валюта</Typography>
      { currencies.map(item => (
        <Typography key={item.title} className={styles.currenciesValues}>{item.title}</Typography>
        )) }
    </Grid>
    <Grid item xs={4}>
    <Typography className={styles.currenciesHeader}>Купівля / Продаж</Typography>
      { currencies.map(item => (
        <Typography key={item.title} className={styles.currenciesValues}>{parseFloat(item.byeRate).toFixed(4)} / {parseFloat(item.sellRate).toFixed(4)}</Typography>
        )) }
    </Grid>
    </Grid>
  </div>
}