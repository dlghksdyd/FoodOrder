# 디버그 컨테이너를 사용자 지정하는 방법과 Visual Studio 이 Dockerfile을 사용하여 더 빠른 디버깅을 위해 이미지를 빌드하는 방법을 알아보려면 https://aka.ms/customizecontainer를 참조하세요.

# 컨테이너를 빌드하거나 실행할 호스트 컴퓨터의 운영 체제에 따라 FROM 문에 지정된 이미지를 변경해야 할 수 있습니다.
# 자세한 내용은 https://aka.ms/containercompat를 참조하세요.

# 이 스테이지는 VS에서 빠른 모드로 실행할 때 사용됩니다(디버그 구성의 기본값).
# FROM mcr.microsoft.com/dotnet/aspnet:8.0-nanoserver-1809 AS base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# VS가 launchSettings.json의 ASPNETCORE_HTTP/HTTPS_PORTS를 컨테이너로 전달합니다.
# 컨테이너 내부 노출 포트만 안내용으로 열어둡니다.
EXPOSE 8080
EXPOSE 8081


# 2) 빌드/복원 이미지 (SDK)
# FROM mcr.microsoft.com/dotnet/sdk:8.0-nanoserver-1809 AS build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# 프로젝트 파일만 먼저 복사 (복원 캐시 최적화)
COPY ["FoodOrder/FoodOrder.csproj", "FoodOrder/"]
RUN dotnet restore "./FoodOrder/FoodOrder.csproj"

# 나머지 소스 복사 후 빌드
COPY . .
WORKDIR "/src/FoodOrder"
RUN dotnet build "./FoodOrder.csproj" -c %BUILD_CONFIGURATION% -o /app/build

# 3) 퍼블리시 단계
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./FoodOrder.csproj" -c %BUILD_CONFIGURATION% -o /app/publish /p:UseAppHost=false

# 4) 최종 런타임 이미지
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# Kestrel을 기본 엔트리포인트로 실행
ENTRYPOINT ["dotnet", "FoodOrder.dll"]