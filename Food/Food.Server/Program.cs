using Food.Server.Controllers;
using Food.Server.Controllers.Postgresql;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine($"[ENV] ASPNETCORE_ENVIRONMENT = {builder.Environment.EnvironmentName}");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme);
// 기본/폴백 정책을 모두 허용으로 설정
builder.Services.AddAuthorization(options =>
{
    var allowAll = new AuthorizationPolicyBuilder()
        .RequireAssertion(_ => true) // 항상 통과
        .Build();

    options.DefaultPolicy = allowAll;
    options.FallbackPolicy = allowAll;
});

// DataProtection 키를 볼륨에 보관 → 재시작 후 쿠키/세션 유지
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo("/app/.aspnet/DataProtection-Keys"))
    .SetApplicationName("FoodServer");


// ----------------------------------------------------------------------------
// Data Protection (쿠키/세션 암호화 키 저장소 설정)
//   - 키를 컨테이너 볼륨에 보관해서 재시작 시에도 동일 키 사용
//   - 동일 ApplicationName끼리만 공유됨
// ----------------------------------------------------------------------------
string? pgHost = builder.Configuration.GetValue<string>("IS_DOCKER");
string connectionString;
if (pgHost is null) 
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
else
    connectionString = builder.Configuration.GetConnectionString("Docker");

// ----------------------------------------------------------------------------
// Database (PostgresSQL 연결 & EF Core DbContext 등록)
//   - 연결 문자열: appsettings.json 의 ConnectionStrings:DefaultConnection
//   - DbContext: Scoped 수명으로 DI 컨테이너에 등록됨
// ----------------------------------------------------------------------------
builder.Services.AddDbContext<PostgresqlDbContext>(options => options.UseNpgsql(connectionString));

var app = builder.Build();

app.UseDefaultFiles(); // index.html을 기본 파일로 인식
app.UseStaticFiles();  // wwwroot의 정적 파일 서빙

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 인증 없음
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
