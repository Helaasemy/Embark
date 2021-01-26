import React, { useState, useEffect } from 'react';

import { debounce } from 'lodash';

import { fetchComics, fetchCurrentComic } from '../xkcd';
import Comics from './Comics/Comics';
import styles from './Main.module.scss';

function Main() {
  const [current, setCurrent] = useState<any>({})
  const [data, setData] = useState<any>([])

  const setIds = (num: any, limit: any) => {
    const arr = []
    for (let i = num; i > num - limit; i--) { arr.push(i) }
    return arr
  }

  useEffect(() => {
    const fetchMain = async () => {
      const id = await fetchCurrentComic()
      setCurrent(id)
      const results = await Promise.all(setIds(id.num, 12).map(id => fetchComics(id)))
      setData(results)
    }
    fetchMain()
  }, [])

  useEffect(() => {
    if (data.length > 0) {
        const fetchMore = async () => {
          const lastItem = data[data.length - 1]
          const Moreresults = await Promise.all(setIds(lastItem.num, 12).map(id => fetchComics(id)))
          setData([...data, ...Moreresults])
        }
        window.addEventListener('scroll', debounce(fetchMore, 300))
        return window.removeEventListener('scroll', fetchMore);
    }

  }, [data])

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <Comics data={data} />
      </div>
    </div>
  );
}

export default Main;