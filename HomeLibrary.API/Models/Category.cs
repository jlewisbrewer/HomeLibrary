using System.Collections.Generic;

namespace HomeLibrary.API.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public ICollection<BookCategory> BookCategories { get; set; }
    }   
}