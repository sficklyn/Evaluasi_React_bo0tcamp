import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from './components/Button'
import Template from './components/Template'

export default function FormAPI() {
  const [data, setdata] = useState([])
  const [edit, setedit] = useState(null)
  const getData = () => {
    console.log('get data')
    axios.get('http://localhost:3001/Listed')
      .then(hasil => {
        setdata(hasil.data)
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.Listed.value
    axios.post('http://localhost:3001/Listed', { name: value })
      .then(() => {
        console.log('post')
        getData()
      })

    e.target.Listed.value = ''
  }
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/Listed/${id}`).then(() => {
      console.log('delete')
      getData()
    })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    console.log('index edit', edit, data[edit].id)
    axios.patch(`http://localhost:3001/Listed/${data[edit].id}`, { name: e.target.Listed.value })
      .then(() => {
        getData()
        setedit(null)
      })
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <Template>
      <form onSubmit={handleSubmit} className="p-5 grid grid-cols-2 gap-4 border rounded-lg drop-shadow-2xl">
        <input type="text" className="form-input" name="Listed" placeholder='List' />
        <Button type="submit" text="Tambah"/>
      </form>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-3 items-center'>
        {data.map((Listed, i) => {
          return <div key={i} className='drop-shadow-2xl bg-white border rounded-lg overflow-hidden p-4'>
            {edit === i ?
              <form className='w-full flex space-x-2' onSubmit={(event) => handleEdit(event)}>
                <input className="form-input w-2/3" name="Listed" defaultValue={Listed.name} />
                <button className='bg-blue-500 text-white py-2 px-2 rounded-full w-1/3'>Simpan</button>
              </form>
              : Listed.name
            }
            <div className='flex py-4 gap-4 text-center'>
              <div className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-2 w-1/2 rounded-full' onClick={() => setedit(i === edit ? null : i)}>Ubah</div>
              <div className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 w-1/2 rounded-full' onClick={() => handleDelete(Listed.id)}>hapus</div>
            </div>
          </div>
        })}
      </div>
    </Template>
  )
} 
