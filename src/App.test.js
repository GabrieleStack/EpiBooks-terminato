import React from "react";
import { fireEvent, render, screen, waitFor} from '@testing-library/react'
import Welcome from "./Welcome";
import '@testing-library/jest-dom/extend-expect'
import AllTheBooks from "./AllTheBooks";
import Books from '../src/fantasy.json'
import { MemoryRouter } from "react-router-dom";
import CommentArea from "./CommentArea";
import App from "./App";
import MyNav from "./MyNav";

//TEST COMPONENTE WELCOME

test('verifica montaggio componente Welcome', () => {
    render(<Welcome/>)

    const welcomeElement = screen.getByText(/Benvenuti in Epibooks!/i)
    expect(welcomeElement).toBeInTheDocument()

})

//TEST COMPONENTE ALLTHEBOOKS
test('verifica numerazione card', () => {

    render(
      <MemoryRouter>
        <AllTheBooks Books={Books}/>
      </MemoryRouter>
    )

    const BooksShowed = screen.getAllByRole('img')
    expect(BooksShowed.length).toBe(Books.length)
})

//TEST COMPONENTE COMMENTAREA

test('verifica render componente CommentArea', async() => {
    render(<CommentArea asin={'0786966246'}/>)

    await waitFor(() => {
        const inputElement = screen.getByPlaceholderText(/Inserisci Recensione/i)
        expect(inputElement).toBeInTheDocument();
      });
      

    const inputButton = screen.getByText(/aggiungi/i)
    expect(inputButton).toBeInTheDocument()

    //verifico se un commento sia presente
    await waitFor(() => {
        const commentList = screen.getByTestId('comment-list');
        const commentItems = screen.getAllByTestId(/comment-item-/i);
        expect(commentList).toBeInTheDocument();
        expect(commentItems.length).toBeGreaterThan(0);
      });
      
    //simulo l'aggiunta di un commento
        const inputElement = screen.getByPlaceholderText(/Inserisci Recensione/i)
        fireEvent.change(inputElement, {target: {value: 'test comment'} })
        fireEvent.click(inputButton)

    await waitFor(() => {
        const commentItems = screen.getAllByTestId(/comment-item-/i);
        expect(commentItems.some(el => el.textContent === 'test comment')).toBe(true)

    })

})


//TEST FILTRAGGIO DEI LIBRI CERCATI

test('verifico il filtraggio dei libri tramite navbar', async () => {
    render(
    <App/>,
    <MyNav/>
    )

    const inputNav = screen.getByPlaceholderText(/Search/i)
    expect(inputNav).toBeInTheDocument()

    fireEvent.change(inputNav, {target: { value: 'The Last Wish: Introducing the Witcher'} })

    await waitFor(() => {
        const filteredBooks = screen.getAllByTestId('book-card')
        expect(filteredBooks.length).toBeGreaterThan(0)

    })

})

//TEST VERIFICA COMPORTAMENTO CARD AL CLICK

test('verifico il click sulla card', async () => {

    render(
    <MemoryRouter>
        <AllTheBooks Books={Books}/>
    </MemoryRouter>
   
)

    const bookCard = screen.getAllByTestId('book-card')

    fireEvent.click(bookCard[0])
    
    waitFor(() => {
        expect(bookCard[0]).toHaveClass('clicked')
    })


})