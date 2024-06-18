import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './MyNav'
import MyFooter from './MyFooter';
import Welcome from './Welcome';
import AllTheBooks from './AllTheBooks';
import BookDetails from './SingleBook'
import CommentArea from './CommentArea';
import Books from '../src/fantasy.json';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {

  const [searchTerms, setSearchTerms] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(Books)

  const HandleSearch = (event) => {
    const value = event.target.value
    setSearchTerms(value)
    const filter = Books.filter(book => 
      book.title.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredBooks(filter)
  }
  
  
  return (
    <Router>
      <MyNav searchTerms={searchTerms} HandleSearch={HandleSearch} showSearch={true} />
      <Welcome/>
      <Routes>
        <Route path="/" exact element={<AllTheBooks Books={filteredBooks} />} />
        <Route path="/books/:asin" element={<BookDetails Books={Books}/>} />
      </Routes>
      <AllTheBooks Books={filteredBooks}/>
      <CommentArea/>
      <MyFooter />
    </Router>
  );
}
  

export default App;


