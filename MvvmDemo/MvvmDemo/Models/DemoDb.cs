using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web;

namespace MvvmDemo.Models
{
    public class DemoDb: DbContext
    {
        public DemoDb()
            : base("name=ExpertInfoDB")
        {
        }

        public virtual DbSet<Task> Tasks { get; set; }
    }
}