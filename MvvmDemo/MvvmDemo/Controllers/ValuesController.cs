using MvvmDemo.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MvvmDemo.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        public dynamic GetList()
        {
            DemoDb db = new DemoDb();
            dynamic result = new ExpandoObject();
            result.expertInfoEducation = db.Tasks.ToList();
            return result;


        }

        // GET api/values/5
        public dynamic Get(int id)
        {
            DemoDb db = new DemoDb();
            return db.Tasks.FirstOrDefault(c => c.id == id);

        }

        // POST api/values
        public dynamic Post(Task model)
        {
            DemoDb db = new DemoDb();
            db.Tasks.Add(model);
            db.SaveChanges();
            return Json(new { type = model.id, mess = "" });
        }


        // DELETE api/values/5
        public dynamic Delete(int id)
        {
            DemoDb db = new DemoDb();
            int result = db.Database.ExecuteSqlCommand("delete from tasks where id=" + id);
            return Json(new { type = result, mess = "" });
        }
    }
}
