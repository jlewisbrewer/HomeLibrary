using System.Threading.Tasks;
using HomeLibrary.API.Data;
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
        public UsersController(IHomeLibraryRepository repo)
        {
            _repo = repo;

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserBooks(int id)
        {
            var books = await _repo.GetUserBooks(id);

            return Ok(books);
        }

    }
}