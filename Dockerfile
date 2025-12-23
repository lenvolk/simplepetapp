# Stage 1: build API and publish
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution and restore
COPY ./MyPetVenues.Api/MyPetVenues.Api.csproj ./MyPetVenues.Api/
RUN dotnet restore ./MyPetVenues.Api/MyPetVenues.Api.csproj

# Copy everything and publish
COPY . .
RUN dotnet publish ./MyPetVenues.Api/MyPetVenues.Api.csproj -c Release -o /app/publish

# Stage 2: runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "MyPetVenues.Api.dll"]
