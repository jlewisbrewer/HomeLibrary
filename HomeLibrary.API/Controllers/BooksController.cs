using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using HomeLibrary.API.Data;
using HomeLibrary.API.Dtos;
using HomeLibrary.API.Helpers;
using HomeLibrary.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HomeLibrary.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IHomeLibraryRepository _repo;
        private readonly IMapper _mapper;
        public BooksController(IHomeLibraryRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _repo.GetBooks();
            var booksToReturn = _mapper.Map<IEnumerable<BookForListDto>>(books);
            return Ok(booksToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _repo.GetBook(id);
            var bookToReturn = _mapper.Map<BookForDetailedDto>(book);

            return Ok(bookToReturn);
        }

        [HttpPost("search")]
        public async Task<IActionResult> Search(BookForSearchDto bookForSearchDto)
        {

            var bookId = await _repo.SearchForExistingBook(bookForSearchDto);
            if (bookId != -1)
            {
                var book = await _repo.GetBook(bookId);
                var bookToReturn = _mapper.Map<BookForDetailedDto>(book);

                return Ok(bookToReturn);
            }

            var responseString = await BookSearch.Search(bookForSearchDto);
            var booksFromJson = JsonConvert.DeserializeObject<dynamic>(responseString);

            if (booksFromJson.error != null)
            {
                return BadRequest("Unable to find book");
            }

            var booksToReturn = new List<BookForRegisterDto>();

            foreach (var item in booksFromJson.items)
            {
                System.Console.WriteLine(item);
                var bookToReturn = new BookForRegisterDto();
                var bookFromJsonHelper = item.volumeInfo;
                bookToReturn.Title = bookFromJsonHelper.title;
                bookToReturn.Author = bookFromJsonHelper.authors[0];
                bookToReturn.Publisher = bookFromJsonHelper.publisher;
                bookToReturn.Description = bookFromJsonHelper.description;
                if (bookFromJsonHelper.industryIdentifiers[0].type != "OTHER")
                {
                    bookToReturn.Isbn10 = bookFromJsonHelper.industryIdentifiers[1].identifier;
                    bookToReturn.Isbn13 = bookFromJsonHelper.industryIdentifiers[0].identifier;
                }
                if (bookFromJsonHelper.pageCount != null)
                {
                    bookToReturn.PageCount = bookFromJsonHelper.pageCount;
                }
                bookToReturn.PhotoUrl = bookFromJsonHelper.imageLinks.thumbnail;

                booksToReturn.Add(bookToReturn);
            }

            System.Console.WriteLine(booksToReturn.Count);

            return Ok(booksToReturn);

        }
    }
}