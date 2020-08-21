using HomeLibrary.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeLibrary.API.Data
{
    public class DataContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserBookCategory>().HasKey(sc => new { sc.UserBookId, sc.CategoryId });
            // modelBuilder.Entity<UserBook>().HasKey(sc => new { sc.UserId, sc.BookId });
        }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<UserBookCategory> BookCategories { get; set; }
        public DbSet<UserBook> UserBooks { get; set; }
    }
}