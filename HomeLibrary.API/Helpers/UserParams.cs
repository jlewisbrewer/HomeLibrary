namespace HomeLibrary.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {                   
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }                   

        public string AuthorFilter { get; set; }
        public string TitleFilter { get; set; }
        public string PublisherFilter { get; set; }

        public string OrderBy { get; set; }
    }
}