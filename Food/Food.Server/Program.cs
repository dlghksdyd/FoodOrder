using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

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
    .PersistKeysToFileSystem(new DirectoryInfo("/keys"))
    .SetApplicationName("FoodServer");

var app = builder.Build();

// app.UseHttpsRedirection();

app.UseDefaultFiles(); // index.html을 기본 파일로 인식
app.UseStaticFiles();  // wwwroot의 정적 파일 서빙

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 인증 없음
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
