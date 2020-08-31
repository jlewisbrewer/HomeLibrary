using HomeLibrary.API.Models;

namespace HomeLibrary.API.Dtos
{
    public class UserBookDto
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
        public int Read { get; set; }
        
    }
}