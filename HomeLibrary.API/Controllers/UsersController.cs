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

        [HttpGet("{id}/books", Name="GetUserBooks")]
        public async Task<IActionResult> GetUserBooks(int id)
        {
            var books = await _repo.GetUserBooks(id);
            var booksToReturn = _mapper.Map<IEnumerable<BookForListDto>>(books);
            return Ok(booksToReturn);
        }
        // public async Task<IActionResult> GetBook(int id)
        // {
        //     var book = await _repo.GetBook(id);
            
        //     return Ok(book);
        // }

    }
}