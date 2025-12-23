using Azure.Identity;
using Microsoft.Azure.Cosmos;
using MyPetVenues.Api.Options;

namespace MyPetVenues.Api.Data.Cosmos;

public class CosmosClientFactory
{
    private readonly CosmosOptions _options;
    private CosmosClient? _client;

    public CosmosClientFactory(CosmosOptions options)
    {
        _options = options;
    }

    public CosmosClient GetClient()
    {
        if (_client == null)
        {
            var clientOptions = new CosmosClientOptions
            {
                SerializerOptions = new CosmosSerializationOptions
                {
                    PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase
                }
            };

            _client = new CosmosClient(_options.Endpoint, new DefaultAzureCredential(), clientOptions);
        }

        return _client;
    }

    public Container GetContainer(string containerName)
    {
        var client = GetClient();
        return client.GetContainer(_options.DatabaseName, containerName);
    }
}
