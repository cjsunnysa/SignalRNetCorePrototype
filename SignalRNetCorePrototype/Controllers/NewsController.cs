using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SignalRNetCorePrototype.Repositories;

namespace SignalRNetCorePrototype.Controllers
{
    [Route("api/[controller]")]
    public class NewsController : Controller
    {
        private readonly NewsRepository _repository;

        public NewsController(NewsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("groups")]
        public IEnumerable<string> GetAllGroups()
        {
            return _repository.GetAllGroups();
        }
    }
}
