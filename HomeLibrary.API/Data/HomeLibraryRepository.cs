using System.Collections.Generic;
using System.Linq;
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

            var book = await _context.Books
                .FirstOrDefaultAsync(b => b.Id == id);
            
            book.BookCategories = await _context.BookCategories
                .Include(bc => bc.Category)
                .ToListAsync();

            return book;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            var books = await _context.Books
                .ToListAsync();

            return books;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);
            
            user.UserBooks = await _context.UserBooks
                .Include(ub => ub.Book)
                .Where(x => x.UserId == id)
                .ToListAsync();

            return user;
        }

        public async Task<IEnumerable<UserBook>> GetUserBooks(int id)
        {
            var books = await _context.UserBooks
                .Include(ub => ub.Book)
                .Where(x => x.UserId == id)
                .ToListAsync();

            return books;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}