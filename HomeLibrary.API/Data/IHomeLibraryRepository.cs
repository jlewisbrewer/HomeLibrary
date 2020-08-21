using System.Collections.Generic;
using System.Threading.Tasks;
using HomeLibrary.API.Models;

namespace HomeLibrary.API.Data
{
    public interface IHomeLibraryRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<Book>> GetBooks();
        Task<IEnumerable<Book>> GetUserBooks(int id);

        Task<User> GetUser(int id);
        Task<Book> GetBook(int id);
    }
}