using System.Net.Http;
using System.Threading.Tasks;

namespace HomeLibrary.API.Helpers
{
    public class BookSearch
    {
        private static string bookApi = "https://www.googleapis.com/books/v1/volumes?q=";

        // private static string fieldRestriction = ""

        public static async Task<string> Search(string searchParameter, string fieldRestriction)
        {

            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync(bookApi + searchParameter + fieldRestriction);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();

        }
    }
}