using System.ComponentModel.DataAnnotations;

namespace HomeLibrary.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [RegularExpression("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$", ErrorMessage = "You must specify a valid email address.")]
        public string EmailAddress { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters.")]
        public string Password { get; set; }
    }
}