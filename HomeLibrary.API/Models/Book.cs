namespace HomeLibrary.API.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Isbn  { get; set; }
        public string Publisher { get; set; }
        public int NumberPages { get; set; }
        public int Read { get; set; }

    }
}