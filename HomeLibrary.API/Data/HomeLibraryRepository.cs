using System.Collections.Generic;
using System.Threading.Tasks;
using HomeLibrary.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeLibrary.API.Data
{
    public class HomeLibraryRepository : IHomeLibraryRepository
    {
        private readonly DataContext _context;
        public HomeLibraryRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Book> GetBook(int id)
        {
            // This might not work 

            var book = await _context.Books.Include(c => c.BookCategories).FirstOrDefaultAsync(b => b.BookId == id);

            return book;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            var books = await _context.Books.ToListAsync();

            return books;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}