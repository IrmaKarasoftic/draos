﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskDb
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Company Company { get; set; }
        public bool IsDeleted { get; set; }
        public string UserImageUrl { get; set; }
    }
}
