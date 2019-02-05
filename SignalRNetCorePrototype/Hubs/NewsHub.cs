using Microsoft.AspNetCore.SignalR;
using SignalRNetCorePrototype.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRNetCorePrototype.Hubs
{
    public class NewsHub : Hub
    {
        private readonly NewsRepository _repository;

        public NewsHub(NewsRepository repository)
        {
            _repository = repository;
        }

        public Task Send(NewsItem item)
        {
            if (!_repository.GroupExists(item.NewsGroup))
                throw new Exception("Cannot send to a news group that doesn't exist.");

            _repository.AddNewsItem(item);
            return Clients.Group(item.NewsGroup).SendAsync("Send", item);
        }

        public async Task JoinGroup(string groupname)
        {
            if (!_repository.GroupExists(groupname))
                throw new Exception("Cannot join a group that doesn't exist.");

            await Groups.AddToGroupAsync(Context.ConnectionId, groupname);
            await Clients.Group(groupname).SendAsync("Join Group", groupname);

            var history = _repository.GetAllNewsItems(groupname);
            await Clients.Client(Context.ConnectionId).SendAsync("History", history);
        }

        public async Task LeaveGroup(string groupname)
        {
            if (!_repository.GroupExists(groupname))
                throw new Exception("Cannot leave a group that doesn't exist.");

            await Clients.Group(groupname).SendAsync("Leave Group", groupname);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupname);
        }
    }
}
