namespace HomeLibrary.API.Dtos
{
    public class BookForDetailedDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public string Isbn10 { get; set; }
        public string Isbn13 { get; set; }
        public int PageCount { get; set; }
        public string PhotoUrl { get; set; }
    }
}