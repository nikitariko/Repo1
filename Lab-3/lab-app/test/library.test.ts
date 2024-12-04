import { Library } from '../src/library';
import * as assert from 'assert';
import { describe } from 'mocha';

interface Book {
  title: string;
  author: string;
  year: number;
}

describe('Library Class', () => {
  let library: Library<Book>;

  beforeEach(() => {
    library = new Library<Book>();
  });

  it('Should add an item to the collection', () => {
    const book: Book = { title: 'Book Title', author: 'Author Name', year: 2023 };
    library.addItem(book);
    assert.deepEqual(library.getAllItems(), [book]);
  });

  it('Should remove an item from the collection', () => {
    const book1: Book = { title: 'Book One', author: 'Author One', year: 2021 };
    const book2: Book = { title: 'Book Two', author: 'Author Two', year: 2022 };
    library.addItem(book1);
    library.addItem(book2);

    library.removeItem(0);
    assert.deepEqual(library.getAllItems(), [book2]);
  });

  it('Should not remove an item with invalid index', () => {
    const book: Book = { title: 'Book Title', author: 'Author Name', year: 2023 };
    library.addItem(book);
    
    library.removeItem(5);  // Невірний індекс
    assert.deepEqual(library.getAllItems(), [book]);
  });

  it('Should find an item by a predicate', () => {
    const book1: Book = { title: 'Book One', author: 'Author One', year: 2021 };
    const book2: Book = { title: 'Book Two', author: 'Author Two', year: 2022 };
    library.addItem(book1);
    library.addItem(book2);

    const foundBook = library.findItem(book => book.title === 'Book Two');
    assert.deepEqual(foundBook, book2);
  });

  it('Should return undefined if no item matches the predicate', () => {
    const book: Book = { title: 'Book Title', author: 'Author Name', year: 2023 };
    library.addItem(book);

    const foundBook = library.findItem(book => book.title === 'Nonexistent Book');
    assert.equal(foundBook, undefined);
  });

  it('Should return all items in the collection', () => {
    const book1: Book = { title: 'Book One', author: 'Author One', year: 2021 };
    const book2: Book = { title: 'Book Two', author: 'Author Two', year: 2022 };
    library.addItem(book1);
    library.addItem(book2);

    assert.deepEqual(library.getAllItems(), [book1, book2]);
  });
});
