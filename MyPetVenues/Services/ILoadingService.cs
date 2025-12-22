namespace MyPetVenues.Services;

public interface ILoadingService
{
    void SetLoading(string key, bool isLoading);
    bool IsLoading(string key);
    IObservable<bool> Observe(string key);
}
