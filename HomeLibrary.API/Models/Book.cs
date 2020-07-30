using System.Collections.Generic;

namespace HomeLibrary.API.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public string Isbn10 { get; set; }
        public string Isbn13 { get; set; }
        public int PageCount { get; set; }
        public ICollection<BookCategory> BookCategories { get; set; }
        public ICollection<UserBook> UserBooks { get; set; }
        public string PhotoUrl { get; set; }

    }
}