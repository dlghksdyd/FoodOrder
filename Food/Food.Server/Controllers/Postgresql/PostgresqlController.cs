using Food.Server.Controllers.Postgresql;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize]
[ApiController]
[Route("[controller]")]
public class PostgresqlController : ControllerBase
{
    private readonly PostgresqlDbContext _db;

    public PostgresqlController(PostgresqlDbContext db)
    {
        _db = db;
    }

    [HttpGet("shoes")]
    public async Task<ActionResult<IEnumerable<Shoe>>> GetShoes(CancellationToken ct)
    {
        var shoes = await _db.Shoes
            .AsNoTracking()
            .ToListAsync(ct);

        // 비어 있어도 []를 반환하는 것이 일반적
        return Ok(shoes);
    }
}

