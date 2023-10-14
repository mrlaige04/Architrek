using Microsoft.EntityFrameworkCore;

namespace Domain.Entities;
[Owned] public class Coordinate
{
    public int Longitude { get; set; } 
    public int Latitude { get; set; }
}
