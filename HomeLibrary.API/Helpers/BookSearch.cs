using System.Net.Http;
using System.Threading.Tasks;
using HomeLibrary.API.Dtos;

namespace HomeLibrary.API.Helpers
{
    public class BookSearch
    {
        private static string bookApi = "https://www.googleapis.com/books/v1/volumes?q=";

        private static string fieldRestriction = "&fields=items(volumeInfo/title, volumeInfo/authors, volumeInfo/publisher, volumeInfo/description, volumeInfo/industryIdentifiers, volumeInfo/pageCount, volumeInfo/imageLinks)";
        public static async Task<string> Search(BookForSearchDto bookForSearchDto)
        {
            var searchParameter = InitializeSearchParameter(bookForSearchDto);

            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync(bookApi + searchParameter + fieldRestriction);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();

        }
        public static string InitializeSearchParameter(BookForSearchDto bookForSearchDto)
        {
            var searchParameter = "";
            if(bookForSearchDto.Title.Length > 0)
            {
                searchParameter += "intitle:" + bookForSearchDto.Title.Replace(' ', '+') + '&';
            }
            if(bookForSearchDto.Author.Length > 0)
            {
                searchParameter += "inauthors:" + bookForSearchDto.Author.Replace(' ', '+') + '&';
            }
            if(bookForSearchDto.Isbn.Length > 0)
            {
                searchParameter += "isbn:" + bookForSearchDto.Isbn;
            }

            return searchParameter;
            
        }
    }
}