using System.Collections.Concurrent;

namespace MyPetVenues.Services;

internal sealed class BehaviorSubject<T> : IObservable<T>
{
    private readonly List<IObserver<T>> _observers = new();
    private T _value;

    public BehaviorSubject(T initial) => _value = initial;
    public T Value => _value;

    public void OnNext(T value)
    {
        _value = value;
        foreach (var observer in _observers.ToArray())
        {
            observer.OnNext(value);
        }
    }

    public IDisposable Subscribe(IObserver<T> observer)
    {
        if (!_observers.Contains(observer))
            _observers.Add(observer);
        observer.OnNext(_value);
        return new Subscription(() => _observers.Remove(observer));
    }

    private sealed class Subscription : IDisposable
    {
        private readonly Action _onDispose;
        public Subscription(Action onDispose) => _onDispose = onDispose;
        public void Dispose() => _onDispose();
    }
}

public class LoadingService : ILoadingService
{
    private readonly ConcurrentDictionary<string, BehaviorSubject<bool>> _subjects = new();

    public void SetLoading(string key, bool isLoading)
    {
        var subject = _subjects.GetOrAdd(key, _ => new BehaviorSubject<bool>(false));
        subject.OnNext(isLoading);
    }

    public bool IsLoading(string key) => _subjects.TryGetValue(key, out var subject) && subject.Value;

    public IObservable<bool> Observe(string key) => _subjects.GetOrAdd(key, _ => new BehaviorSubject<bool>(false));
}
