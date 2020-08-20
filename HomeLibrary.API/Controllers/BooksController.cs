using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using HomeLibrary.API.Data;
using HomeLibrary.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    }
}