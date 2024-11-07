"use client";

import React, { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import {
  Container,
  Wrapper,
  SearchContainer,
  StyledTable,
  StyledTableCell,
  StyledInput,
  StyledTableHeader,
  TableContainer,
} from "./allBookStyle";

// Define the book type
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
  genre: string;
  publisher: string;
}

// Static book data
const bookData: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    publicationDate: "1925-04-10",
    genre: "Fiction",
    publisher: "Scribner",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    publicationDate: "1949-06-08",
    genre: "Dystopian",
    publisher: "Secker & Warburg",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780060935467",
    publicationDate: "1960-07-11",
    genre: "Fiction",
    publisher: "J.B. Lippincott & Co.",
  },
  // Add more book data as needed
];

const BookTable: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [sortOrder, setSortOrder] = useState<{ [key in keyof Book]?: string }>({});
  const [filteredData, setFilteredData] = useState(bookData);

  const handleSort = (key: keyof Book) => {
    const newOrder = sortOrder[key] === "asc" ? "desc" : "asc";
    setSortOrder({ ...sortOrder, [key]: newOrder });

    const sortedData = [...filteredData].sort((a, b) => {
      if (newOrder === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });

    setFilteredData(sortedData);
  };

  // Filter books based on search input
  const handleSearch = () => {
    const filtered = bookData.filter((book) =>
      book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      book.author.toLowerCase().includes(searchAuthor.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Wrapper>
      <Container>
        <SearchContainer>
          <StyledInput
            type="text"
            placeholder="Search by Title ..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder="Search by Author ..."
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
        </SearchContainer>

        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <StyledTableHeader onClick={() => handleSort("id")}>
                  ID {sortOrder.id === "asc" ? <FaSortDown /> : <FaSortUp />}
                </StyledTableHeader>
                <StyledTableHeader onClick={() => handleSort("title")}>
                  Title{" "}
                  {sortOrder.title === "asc" ? <FaSortDown /> : <FaSortUp />}
                </StyledTableHeader>
                <StyledTableHeader onClick={() => handleSort("author")}>
                  Author{" "}
                  {sortOrder.author === "asc" ? <FaSortDown /> : <FaSortUp />}
                </StyledTableHeader>
                <StyledTableHeader onClick={() => handleSort("isbn")}>
                  ISBN{" "}
                  {sortOrder.isbn === "asc" ? <FaSortDown /> : <FaSortUp />}
                </StyledTableHeader>
                <StyledTableHeader onClick={() => handleSort("publicationDate")}>
                  Publication Date{" "}
                  {sortOrder.publicationDate === "asc" ? <FaSortDown /> : <FaSortUp />}
                </StyledTableHeader>
                <StyledTableHeader onClick={() => handleSort("genre")}>
                  Genre{" "}
                  {sortOrder.genre === "asc" ? <FaSortDown /> : <FaSortUp />}
                </StyledTableHeader>
                <StyledTableHeader onClick={() => handleSort("publisher")}>
                  Publisher{" "}
                  {sortOrder.publisher === "asc" ? <FaSortDown /> : <FaSortUp />}
                </StyledTableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((book) => (
                  <tr key={book.id}>
                    <StyledTableCell>{book.id}</StyledTableCell>
                    <StyledTableCell>{book.title}</StyledTableCell>
                    <StyledTableCell>{book.author}</StyledTableCell>
                    <StyledTableCell>{book.isbn}</StyledTableCell>
                    <StyledTableCell>{book.publicationDate}</StyledTableCell>
                    <StyledTableCell>{book.genre}</StyledTableCell>
                    <StyledTableCell>{book.publisher}</StyledTableCell>
                  </tr>
                ))
              ) : (
                <tr>
                  <StyledTableCell colSpan={7} style={{ textAlign: "center" }}>
                    No data found.
                  </StyledTableCell>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </TableContainer>
      </Container>
    </Wrapper>
  );
};

export default BookTable;
