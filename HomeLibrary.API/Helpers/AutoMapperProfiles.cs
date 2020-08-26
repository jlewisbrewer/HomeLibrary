using AutoMapper;
using HomeLibrary.API.Dtos;
using HomeLibrary.API.Models;

namespace HomeLibrary.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Book, BookForListDto>();
            CreateMap<Book, BookForDetailedDto>();
            CreateMap<User, UserForDisplayDto>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}