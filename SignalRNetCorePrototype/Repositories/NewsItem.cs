using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRNetCorePrototype.Repositories
{
    public class NewsItem
    {
        public NewsItem()
        {

        }

        public NewsItem(DateTime date, string author, string header, string article)
        {
            Date = date;
            Author = author;
            Header = header;
            Article = article;
            NewsGroup = null;
        }

        public DateTime Date { get; set; }
        public string Author { get; set; }
        public string Header { get; set; }
        public string Article { get; set; }
        public string NewsGroup { get; set; }
    }
}
