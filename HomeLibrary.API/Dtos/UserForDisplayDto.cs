using System.Collections.Generic;
using HomeLibrary.API.Models;

namespace HomeLibrary.API.Dtos
{
    public class UserForDisplayDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public ICollection<UserBook> UserBooks { get; set; }
    }
}