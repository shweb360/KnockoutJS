using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvvmDemo.Models
{

    public class Task
    {
        public int id { get; set; }

        public int? zjid { get; set; }

        [StringLength(50)]
        public string gzdw { get; set; }

        [StringLength(50)]
        public string qqrq { get; set; }

        public int? zyyj { get; set; }
        public int? isValidate { get; set; }
        public int? deleteStatus { get; set; }
    }
}