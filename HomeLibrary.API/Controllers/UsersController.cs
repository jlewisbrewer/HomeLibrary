using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using HomeLibrary.API.Data;
using HomeLibrary.API.Dtos;
using HomeLibrary.API.Helpers;
using HomeLibrary.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HomeLibrary.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IHomeLibraryRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IHomeLibraryRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet("{id}/books", Name = "GetUserBooks")]
        public async Task<IActionResult> GetUserBooks(int id, [FromQuery]UserParams userParams)
        {
            var books = await _repo.GetUserBooks(id, userParams);

            var booksToReturn = _mapper.Map<IEnumerable<BookForListDto>>(books);
            
            Response.AddPagination(books.CurrentPage, books.PageSize, books.TotalCount, books.TotalPages);

            return Ok(booksToReturn);
        }

        [HttpPost("{id}/books/add")]
        public async Task<IActionResult> AddBook(BookForRegisterDto bookForRegister, int id)
        {
            var bookId = await _repo.SearchForExistingBook(bookForRegister);
            var book = new Book();

            if (bookId != -1)
            {
                System.Console.WriteLine(bookId);
                book = await _repo.GetBook(bookId);
            }
            else
            {
                book = _mapper.Map<Book>(bookForRegister);
                await _repo.AddBook(book);
                await _repo.SaveAll();
            }

            var user = await _repo.GetUser(id);
            var userBookDto = new UserBookDto
            {
                UserId = user.Id,
                User = user,
                BookId = book.Id,
                Book = book,
                Read = 0
            };

            var userBookId = await _repo.SearchForExistingUserBook(userBookDto);
            if (userBookId != -1)
            {
                return BadRequest("Book already in your library.");
            }

            var userBook = _mapper.Map<UserBook>(userBookDto);
            userBook = await _repo.AddUserBook(userBook);

            System.Console.WriteLine(userBook);
            if (await _repo.SaveAll())
                return Ok(userBook);

            return BadRequest("Unable to add book to library.");
        }

        [HttpPost("{id}/books/remove")]
        public async Task<IActionResult> RemoveBook(BookForRegisterDto bookForRegisterDto, int id)
        {
            var bookId = await _repo.SearchForExistingBook(bookForRegisterDto);
            System.Console.WriteLine("book Id");
            System.Console.WriteLine(bookId);
            var user = await _repo.GetUser(id);
            var userBook = await _repo.GetUserBook(user.Id, bookId);


            if (await _repo.RemoveUserBook(userBook))
            {
                await _repo.SaveAll();
                return Ok(userBook);
            }
            return BadRequest("Unable to remove book");
        }

    }
}