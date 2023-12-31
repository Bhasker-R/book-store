import {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar} from 'notistack';

const DeleteBook = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar }  = useSnackbar()
  const {id} = useParams();

  axios.defaults.withCredentials = true;


  const handleDeleteBook = () => {
    setLoading(true)

    axios
      .delete(`https://book-store-mern-one.vercel.app/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully!", {variant: "success"})
        navigate("/")
      })
      .catch((error) => {
        setLoading(false)
        // alert("An error occured! Please check console.")
        enqueueSnackbar("Error!", {variant: "error"})
        console.log(error)
      })
  }

  return (
    <div className='p-4'>

      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>

      {loading ? <Spinner/> : ""}

      <div className='flex flex-col border-2 items-center border-sky-400 rounded-xl p-8 w-[600px] mx-auto'>
        <h3 className='text-xl'>Are you sure you want to delete this book?</h3>

        <button
          className='bg-red-600 text-gray-100 p-4 m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, delete it.</button>
      </div>
    </div>
  )
}

export default DeleteBook