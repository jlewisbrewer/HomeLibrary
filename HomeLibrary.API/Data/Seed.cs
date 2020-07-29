using System.Collections.Generic;
using System.Linq;
using HomeLibrary.API.Models;
using Newtonsoft.Json;

namespace HomeLibrary.API.Data
{
    public class Seed
    {
        public static void SeedBooks(DataContext context) 
        {
            if (!context.Books.Any())
            {
                var bookData = System.IO.File.ReadAllText("Data/BookSeedData.json");
                var books = JsonConvert.DeserializeObject<List<Book>>(bookData);
                foreach (var book in books)
                {
                    context.Books.Add(book);
                }

                context.SaveChanges();
            }
        }
    }
}