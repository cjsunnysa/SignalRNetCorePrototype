using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRNetCorePrototype.Repositories
{
    public class NewsRepository
    {
        private readonly Dictionary<string, List<NewsItem>> _newsStore = new Dictionary<string, List<NewsItem>>();

        public NewsRepository()
        {
            _newsStore.Add("IT", new List<NewsItem>(new[]
            {
                new NewsItem (DateTime.Now, "Scantily Clad", "I.O.T to become sentient 2020", "blah blah blah blah blah blah blah", "IT"),
                new NewsItem (DateTime.Now, "Terrified Terry", "Quantam computer calculates the world is not round", "blah blah blah blah blah blah blah", "IT")
            }));
            _newsStore.Add("News", new List<NewsItem>(new[]
            {
                new NewsItem (DateTime.Now, "Jeering Jerry", "Donald Trump Assasinated, Finally!", "blah blah blah blah blah blah blah", "News"),
                new NewsItem (DateTime.Now, "Precocius Petunia", "Dollar rallies 130% overnight following assasination ", "blah blah blah blah blah blah blah", "News")
            }));
        }

        public bool GroupExists(string groupName)
        {
            return _newsStore.ContainsKey(groupName);
        }

        public void AddNewsItem(NewsItem newsItem)
        {
            if (!GroupExists(newsItem.NewsGroup))
                throw new Exception("Cannot send a news item to a group that doesn't exist.");

            _newsStore[newsItem.NewsGroup].Add(newsItem);
        }

        public IOrderedEnumerable<NewsItem> GetAllNewsItems(string groupName)
        {
            if (!GroupExists(groupName))
                throw new Exception($"Group {groupName} does not exits.");

            return _newsStore[groupName].OrderByDescending(i => i.Date);
        }

        public IEnumerable<string> GetAllGroups()
        {
            return _newsStore.Keys;
        }
    }
}
