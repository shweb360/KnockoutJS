using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvvmDemo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult demo1()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult demo2()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
