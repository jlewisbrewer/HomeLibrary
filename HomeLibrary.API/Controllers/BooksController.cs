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
            var booksToReturn = new List<BookForRegisterDto>();

            var responseString = await BookSearch.Search(bookForSearchDto);
            var booksFromJson = JsonConvert.DeserializeObject<dynamic>(responseString);

            if (booksFromJson.error != null)
            {
                return BadRequest("Unable to find book");
            }


            foreach (var item in booksFromJson.items)
            {
                var bookToReturn = new BookForRegisterDto();
                var bookFromJsonHelper = item.volumeInfo;

                bookToReturn.Title = bookFromJsonHelper.title;
                if (bookFromJsonHelper.authors != null)
                {
                    bookToReturn.Author = bookFromJsonHelper.authors[0];
                }
                if (bookFromJsonHelper.publisher != null)
                {
                    bookToReturn.Publisher = bookFromJsonHelper.publisher;
                }
                if (bookFromJsonHelper.description != null)
                {
                    bookToReturn.Description = bookFromJsonHelper.description;
                }
                if (bookFromJsonHelper.industryIdentifiers != null)
                {
                    if (bookFromJsonHelper.industryIdentifiers[0].type != "OTHER")
                    {
                        foreach (var identifier in bookFromJsonHelper.industryIdentifiers)
                        {
                            if (identifier.type == "ISBN_13")
                                bookToReturn.Isbn13 = identifier.identifier;
                            if (identifier.type == "ISBN_10")
                                bookToReturn.Isbn10 = identifier.identifier;
                        }
                    }
                }
                if (bookFromJsonHelper.pageCount != null)
                {
                    bookToReturn.PageCount = bookFromJsonHelper.pageCount;
                }
                if (bookFromJsonHelper.imageLinks != null)
                {
                    bookToReturn.PhotoUrl = bookFromJsonHelper.imageLinks.thumbnail;
                }
                booksToReturn.Add(bookToReturn);
            }

            return Ok(booksToReturn);

        }

        
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _repo.DeleteBook(id);

            return Ok(book);
        }
    }
    
}