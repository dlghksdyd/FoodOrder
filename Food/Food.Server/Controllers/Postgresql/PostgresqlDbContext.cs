using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Food.Server.Controllers.Postgresql;

public class PostgresqlDbContext(DbContextOptions options) : DbContextBase(options)
{
    public DbSet<Shoe> Shoes => Set<Shoe>();

    protected override void ConfigureModel(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Shoe>(e =>
        {
            e.ToTable("shoes");
            e.HasKey(x => x.Id);
            e.Property(x => x.Title).HasMaxLength(100);
            e.Property(x => x.Description).HasMaxLength(100);
            e.Property(x => x.Price);
            e.Property(x => x.ImgPath).HasMaxLength(100);
        });
    }
}

[Table("shoes")]
public class Shoe
{
    [Column("id")] public int Id { get; set; }
    [Column("title")] public string Title { get; set; } = string.Empty;
    [Column("description")] public string Description { get; set; } = string.Empty;
    [Column("price")] public int Price { get; set; }
    [Column("imgpath")] public string ImgPath { get; set; } = string.Empty;
}