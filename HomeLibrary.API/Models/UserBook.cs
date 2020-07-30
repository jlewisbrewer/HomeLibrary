namespace HomeLibrary.API.Models
{
    public class UserBook
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
        public int Read { get; set; }
    }
}