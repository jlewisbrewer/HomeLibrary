using System.Collections.Generic;

namespace HomeLibrary.API.Models
{
    public class UserBook
    {
        public int UserBookId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
        public int Read { get; set; }
        public ICollection<UserBookCategory> UserBookCategories { get; set; }

    }
}