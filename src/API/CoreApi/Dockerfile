#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/API/CoreApi/CoreApi.csproj", "src/API/CoreApi/"]
COPY ["src/Shared/Application/Application.csproj", "src/Shared/Application/"]
COPY ["src/Shared/Domain/Domain.csproj", "src/Shared/Domain/"]
COPY ["src/Shared/Infrastructure/Infrastructure.csproj", "src/Shared/Infrastructure/"]
RUN dotnet restore "src/API/CoreApi/CoreApi.csproj"
COPY . .
WORKDIR "/src/src/API/CoreApi"
RUN dotnet build "CoreApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CoreApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CoreApi.dll"]