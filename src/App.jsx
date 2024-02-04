import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './App.css'

function App() {
  const [noCountPress, setNoCountPress] = useState(0)
  const [yesClicked, setYesClicked] = useState(false)
  const [name, setName] = useState()
  const yesFontSize = noCountPress * 6 + 16

  const [searchParams, setSearchParams] = useSearchParams()

  const handleNoClick = () => {
    setNoCountPress(() => {
      return noCountPress + 1
    })
  }
  useEffect(() => {
    let queryName = searchParams.get('name')
    if (!queryName) {
      queryName = prompt('Enter the name of your Valentine')
      if (queryName === null || queryName === '') return
      setSearchParams(prev => {
        prev.set('name', queryName)
        return prev
      })
    }
    setName(queryName)
  }, [searchParams, setSearchParams])

  const handleYesClick = () => {
    setYesClicked(true)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(`Link successfully copied! You may now send it to ${(name && name !== 'null') ? name + '!' : 'your Valentine!'}`)
  }

  const handleReset = () => {
    setYesClicked(false)
    setNoCountPress(0)
    let queryName = searchParams.get('name')
    if (!queryName) {
      queryName = prompt('Enter the name of your Valentine')
      if (queryName === null || queryName === '') return
      setSearchParams(prev => {
        prev.set('name', queryName)
        return prev
      })
      setName(queryName)
    } else {
      setSearchParams(prev => {
        prev.delete('name')
        return prev
      })
      setName('')
    }
  }

  const phrases = [
    'No',
    'Are you sure?',
    'really sure?',
    'I will be sad',
    'I will be really really sad :('
  ]


  return (
    <>
      <header>  <button className='button-reset' onClick={handleReset}>Reset</button>
        <button className='button-copy' onClick={handleCopy}>Copy Link to send to {(name && name !== 'null') ? name : 'my Valentine'}</button></header>
      <main>

        {yesClicked ?
          <>
            <img src="/love.gif" alt="" />
            <h1>Yeyy!!</h1>
          </>

          :
          <><img src="/kiss.gif" alt="" />
            <h1>Will you be my Valentine{(name && name !== 'null') && `, ${name}`}?</h1>
            <div className="button-bars">
              <button className='button-yes' style={{ fontSize: yesFontSize }} onClick={handleYesClick}>YES</button>
              {noCountPress <= phrases.length - 1 &&
                <button className='button-no' onClick={handleNoClick}>{phrases[noCountPress]}</button>}
            </div></>}


      </main>
      <footer>
        Created by: KMV
      </footer>
    </>
  )
}

export default App
