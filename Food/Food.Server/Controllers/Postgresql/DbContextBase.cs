using Microsoft.EntityFrameworkCore;

namespace Food.Server.Controllers.Postgresql;

/// <summary>
///     MSSQL 데이터베이스 연결 및 모델 구성을 위한 추상 DbContext 기본 클래스입니다.
///     파생 클래스는 <see cref="ConfigureModel(ModelBuilder)"/>를 구현하여 모델 매핑을 정의해야 합니다.
/// </summary>
public abstract class DbContextBase : DbContext
{
    /// <summary>
    ///     기본 생성자입니다. 
    ///     <see cref="Initialize"/>가 먼저 호출되지 않으면 예외가 발생합니다.
    /// </summary>
    /// <exception cref="InvalidOperationException">
    ///     아직 <see cref="Initialize"/>가 호출되지 않은 경우 발생합니다.
    /// </exception>
    protected DbContextBase(DbContextOptions options) : base(options)
    {
    }

    /// <summary>
    /// 파생 클래스에서 엔터티 모델을 구성할 때 구현해야 하는 메서드입니다.
    /// <see cref="OnModelCreating(ModelBuilder)"/>에서 호출됩니다.
    /// </summary>
    protected abstract void ConfigureModel(ModelBuilder modelBuilder);

    /// <inheritdoc />
    protected sealed override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        ConfigureModel(modelBuilder);
    }
}