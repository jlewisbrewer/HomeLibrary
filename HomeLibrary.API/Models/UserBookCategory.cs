namespace HomeLibrary.API.Models
{
    public class UserBookCategory
    {
        public int UserBookId { get; set; }
        public UserBook UserBook { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }

    }
}