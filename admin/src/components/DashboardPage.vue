<template>
    <div style="background-color: aliceblue; width: 100%;">
        <div>
            <h4 class="m-4">Dashboard</h4>

            <div class="row flex-wrap m-4">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-row justify-content-between">
                                <div class="text-left">
                                    <p class="card-count">{{ totalBooks }}</p>
                                </div>
                                <div class="text-right">
                                    <span class="icon">📚</span>
                                </div>
                            </div>
                            <h5 class="card-title">Total Books</h5>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-row justify-content-between">
                                <div class="text-left">
                                    <p class="card-count">{{ Reading }}</p>
                                </div>
                                <div class="text-right">
                                    <span class="icon">📖</span>
                                </div>
                            </div>
                            <h5 class="card-title">Reading</h5>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-row justify-content-between">
                                <div class="text-left">
                                    <p class="card-count">{{ readBooks }}</p>
                                </div>
                                <div class="text-right">
                                    <span class="icon">✅</span>
                                </div>
                            </div>
                            <h5 class="card-title">Completed Books</h5>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-row justify-content-between">
                                <div class="text-left">
                                    <p class="card-count">{{ Wishlist }}</p>
                                </div>
                                <div class="text-right">
                                    <span class="icon">🌟</span>
                                </div>
                            </div>
                            <h5 class="card-title">Wishlist</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card m-4">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between">
                        <h5 class="card-title">Books Collection</h5>
                        <div class="d-flex flex-row">
                            <div className="conv-search-container">
                                <span className="conv-search-icon ms-2">&#128269;</span>
                                <input type="text" className="form-control conv-search-input" placeholder="Search"
                                    v-model="searchQuery" @keydown="handleSearchChange" />
                            </div>

                            <button class="btn btn-primary" @click="showModal = true">Add Book</button>

                        </div>
                    </div>
                    <div class="mt-4">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">S.No.</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(book, index) in paginatedBooks" :key="index">
                                    <th scope="row">{{ (currentPage - 1) * pageSize + index + 1 }}</th>
                                    <td>{{ book.book_name }}</td>
                                    <td>{{ book.author_name }}</td>
                                    <td>{{ book.genre }}</td>
                                    <td>{{ book.status }}</td>
                                    <td>
                                        <span class="action me-2" @click="editBook(book)">✏️</span>
                                        <span class="action" @click="deletebook(book.book_id)">🗑️</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label="Page navigation">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" href="#" @click="goToPage(1)">First</a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" href="#" @click="goToPage(currentPage - 1)">Previous</a>
                            </li>
                            <li class="page-item" v-for="page in totalPageCount" :key="page"
                                :class="{ active: page === currentPage }">
                                <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === totalPageCount }">
                                <a class="page-link" href="#" @click="goToPage(currentPage + 1)">Next</a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === totalPageCount }">
                                <a class="page-link" href="#" @click="goToPage(totalPageCount)">Last</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>



        </div>
        <div v-if="showModal" class="modal-mask">
            <div class="modal-wrapper" @click="showModal = false">
                <div class="modal-container" @click.stop>
                    <div>
                        <h3>
                            Add Book
                        </h3>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="addBook">
                            <div class="form-group mb-1">
                                <label for="title">Title</label>
                                <input type="text" id="title" class="form-control" placeholder="Enter Title"
                                    v-model="addbook.title" required>
                            </div>
                            <div class="form-group mb-1">
                                <label for="author">Author</label>
                                <input type="text" id="author" class="form-control" placeholder="Enter Author name"
                                    v-model="addbook.author" required>
                            </div>
                            <div class="form-group mb-2">
                                <label for="genre">Genre</label>
                                <select id="genre" class="form-control" v-model="addbook.genre" required>
                                    <option v-for="genreOption in genres" :value="genreOption" :key="genreOption">{{
                                        genreOption }}</option>
                                </select>
                            </div>
                            <div class="form-group mb-1">
                                <label for="status">Status</label>
                                <select id="status" class="form-control" v-model="addbook.status" required>
                                    <option v-for="statusOption in statusOptions" :value="statusOption" :key="statusOption">
                                        {{ statusOption }}</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3" @click="addNewBook()">Add</button>
                            <button type="button" class="btn btn-danger mt-3 ms-3" @click="showModal = false">Close</button>
                        </form>
                    </div>

                    <!-- <div class="modal-footer">
                            <button class="modal-default-button" @click="showModal = false">
                                OK
                            </button>
                    </div> -->
                </div>
            </div>
        </div>
        <div v-if="editselected" class="modal-mask">
            <div class="modal-wrapper" @click="closeModal()">
                <div class="modal-container" @click.stop>
                    <div>
                        <h3>
                            Edit Book
                        </h3>
                    </div>

                    <div class="modal-body">
                        <form>
                            <div class="form-group mb-1">
                                <label for="title">Title</label>
                                <input type="text" id="title" class="form-control" placeholder="Enter Title"
                                    v-model="editselected.title" required>
                            </div>
                            <div class="form-group mb-1">
                                <label for="author">Author</label>
                                <input type="text" id="author" class="form-control" placeholder="Enter Author name"
                                    v-model="editselected.author" required>
                            </div>
                            <div class="form-group mb-2">
                                <label for="genre">Genre</label>
                                <select id="genre" class="form-control" v-model="editselected.genre" required>
                                    <option v-for="genreOption in genres" :value="genreOption" :key="genreOption">{{
                                        genreOption }}</option>
                                </select>
                            </div>
                            <div class="form-group mb-1">
                                <label for="status">Status</label>
                                <select id="status" class="form-control" v-model="editselected.status" required>
                                    <option v-for="statusOption in statusOptions" :value="statusOption" :key="statusOption">
                                        {{ statusOption }}</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3" @click="saveEdit()">Edit Book</button>
                            <button type="button" class="btn btn-danger mt-3 ms-3" @click="closeModal()">Close</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            showModal: false,
            booksList: [
                // { sno: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', status: 'Read' },
                // { sno: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian Fiction', status: 'Reading' },
                // { sno: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', status: 'To Be Read' },
                // { sno: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Classic', status: 'On Hold' },
                // { sno: 5, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', status: 'Not Started' },
                // { sno: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', status: 'Read' },
            ],
            bookListTemp: [],
            genres: ['Fantasy', 'Mystery', 'Science Fiction', 'Romance', 'Thriller', 'Historical Fiction', 'Horror', 'Non-Fiction', 'Biography', 'Poetry'],

            statusOptions: ['Read', 'Reading', 'To Be Read', 'On Hold', 'Not Started'],
            user: undefined,
            addbook: {
                title: '',
                author: '',
                genre: '',
                status: ''
            },
            editselected: undefined,
            currentPage: 1,
            pageSize: 10,
            searchQuery: '',
            totalBooks: 0,
            Reading: 0,
            readBooks: 0,
            Wishlist: 0
        };
    },
    methods: {
        closeModal() {
            this.showModal = false;
            this.editselected = undefined
        },
        getbookbyuid(id) {
       
            axios.get(`http://localhost:3000/api/getbookbyuid/${id}`)
                .then(response => {
                    this.Reading = 0;
                    this.readBooks = 0;
                    this.Wishlist = 0;
                    this.booksList = response.data
                    this.bookListTemp = this.booksList

                    this.totalBooks = this.booksList.length
                    for (const book of this.booksList) {
                        const status = book.status;
                        if (status === "Reading") {
                            this.Reading++;
                        } else if (status === "Read") {
                            this.readBooks++;
                        } else if (status === "To Be Read") {
                            this.Wishlist++;
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        addNewBook() {
            if (!this.addbook.title || !this.addbook.author || !this.addbook.genre || !this.addbook.status) {
                // throw new Error('All fields are required');
                // toast.error("All fields are required", {
                //     autoClose: 3000,
                // });
            } else {

                let data = {
                    "bookName": this.addbook.title,
                    "authorName": this.addbook.author,
                    "genre": this.addbook.genre,
                    "status": this.addbook.status,
                    "userId": this.user.id
                };

                axios.post(`http://localhost:3000/api/addbook`, data)
                    .then(() => {
                        this.getbookbyuid(this.user.id)
                        toast.success("Book added successfully", {
                            autoClose: 3000,
                        });


                        this.closeModal()
                        this.addbook = {
                            title: '',
                            author: '',
                            genre: '',
                            status: ''
                        }

                    })
                    .catch(error => {
                        console.log(error);

                        toast.error("Error adding book", {
                            autoClose: 3000,
                        });
                    });
            }
        },
        editBook(book) {
            console.log("book", book);
            this.editselected = {
                title: book.book_name,
                author: book.author_name,
                genre: book.genre,
                status: book.status,
                book_id: book.book_id
            };

        },

        saveEdit() {
            if (this.editselected.title && this.editselected.author && this.editselected.genre && this.editselected.status) {
                let editdata = {
                    "bookId": this.editselected.book_id,
                    "bookName": this.editselected.title,
                    "authorName": this.editselected.author,
                    "genre": this.editselected.genre,
                    "status": this.editselected.status,
                    "userId": this.user.id
                }

                axios.post(`http://localhost:3000/api/editbookbybid`, editdata)
                    .then(() => {
                        this.getbookbyuid(this.user.id)
                        toast.success("Book deleted successfully", {
                            autoClose: 3000,
                        });
                        this.closeModal()

                    })
                    .catch(error => {
                        console.log(error);
                        toast.error("Error deleting book", {
                            autoClose: 3000,
                        });
                    });
            }
        },

        deletebook(bookId) {
            axios.get(`http://localhost:3000/api/deleteBookByUserId/${this.user.id}/${bookId}`)
                .then(() => {
                    this.getbookbyuid(this.user.id)
                    toast.success("Book edited successfully", {
                        autoClose: 3000,
                    });
                    this.closeModal()
                })
                .catch(error => {
                    console.log(error);
                    toast.error("Error editing book", {
                        autoClose: 3000,
                    });
                });
        }
        ,
        goToPage(pageNumber) {
            if (pageNumber >= 1 && pageNumber <= this.totalPageCount) {
                this.currentPage = pageNumber;
            }
        },
        handleSearchChange(event) {
            const searchTerm = event.target.value;
            this.onSearch(searchTerm)

        },
        onSearch(searchKeyword) {
            this.booksList = this.bookListTemp.filter((book) => {
                for (let key in book) {
                    if (book[key].toString().toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1) {
                        return true;
                    }
                }
                return false;
            });
        }


    },
    computed: {
        paginatedBooks() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.booksList.slice(startIndex, endIndex);
        },
        totalPageCount() {
            return Math.ceil(this.booksList.length / this.pageSize);
        },
    },
    mounted() {
        const userData = localStorage.getItem('userData');

        if (userData) {
            this.user = JSON.parse(userData);
            this.getbookbyuid(this.user.id)

        } else {
            console.log('User data not found');
        }


    }

};
</script>

<style scoped>
.icon {
    font-size: 30px;
    margin-bottom: 10px;
}

.card-count {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 0;
}

.action {
    cursor: pointer;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 700px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.conv-search-container {
    display: flex;
    align-items: center;
    padding: 2px 5px;
    border: none;
    margin-right: 15px;
    border: 1px solid #dcdcdc;
    border-radius: 10px;

    .conv-search-icon {
        font-size: 20px;
    }

    .conv-search-input {
        border: none;
        outline: none;
        box-shadow: none;
        background-color: transparent;

        &::placeholder {
            color: #999;
        }

        &:focus {
            box-shadow: none;
        }
    }
}
</style>
