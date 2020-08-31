using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using HomeLibrary.API.Data;
using HomeLibrary.API.Dtos;
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

        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetUser(int id)
        // {
        //     var user = await _repo.GetUser(id);
        //     // var userToReturn = await _mapper.Map<UserForDisplayDto>(user);
        //     return Ok(user);
        // }

        [HttpGet("{id}/books", Name = "GetUserBooks")]
        public async Task<IActionResult> GetUserBooks(int id)
        {
            var books = await _repo.GetUserBooks(id);
            var booksToReturn = _mapper.Map<IEnumerable<BookForListDto>>(books);
            return Ok(booksToReturn);
        }

        [HttpPost("{id}/books/add")]
        public async Task<IActionResult> AddBook(BookForRegisterDto bookForRegister, int id)
        {
            // First add book to book repo
            var book = _mapper.Map<Book>(bookForRegister);
            await _repo.AddBook(book);
            if (await _repo.SaveAll())
            {
                // Then need to add to UserBook repo
                var user = await _repo.GetUser(id);
                var userBookDto = new UserBookDto
                {
                    UserId = user.Id,
                    User = user,
                    BookId = book.Id,
                    Book = book,
                    Read = 0
                };

                var userBook = _mapper.Map<UserBook>(userBookDto);

                userBook = await _repo.AddUserBook(userBook);

                System.Console.WriteLine(userBook);
                if (await _repo.SaveAll())
                    return Ok("Book added.");
                
                return BadRequest("Unable to add book to library.");
            }

            return BadRequest("Unable to add book to database.");
        }

        [HttpPost("{id}/books/remove")]
        public async Task<IActionResult> RemoveBook(BookForSearchDto bookForSearchDto, int id)
        {
            var bookId = await _repo.SearchForExistingBook(bookForSearchDto);
            var user = await _repo.GetUser(id);
            var userBook = await _repo.GetUserBook(user.Id, bookId);

            if (await _repo.RemoveUserBook(userBook))
                return Ok("Book removed.");
            
            return BadRequest("Unable to remove book");
        }

    }
}