using System.Collections.Generic;
using System.Threading.Tasks;
using HomeLibrary.API.Dtos;
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
        Task<UserBook> GetUserBook(int userId, int bookId);
        Task<Book> GetBook(int id);
        Task<bool> RemoveUserBook(UserBook userBook);
        Task<int> SearchForExistingBook(BookForRegisterDto bookForRegisterDto);
        Task<int> SearchForExistingUserBook(UserBookDto userBookDto);
        Task<Book> AddBook(Book book);
        Task<Book> DeleteBook(int id);
        Task<UserBook> AddUserBook(UserBook userBook);

    }
}