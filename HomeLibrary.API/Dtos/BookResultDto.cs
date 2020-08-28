using System.Collections.Generic;

namespace HomeLibrary.API.Dtos
{
    public class BookResultDto
    {
        public string Title { get; set; }
        public List<string> Authors { get; set; }
        public string Publisher { get; set; }
        public string Description { get; set; }
        public List<string> IndustryIdentifiers { get; set; }
        public int PageCount { get; set; }
        public List<string> ImageLinks { get; set; }
    }
}