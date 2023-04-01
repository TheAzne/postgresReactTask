using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace postgresReactTask.Model
{
    public class Tasks
    {

        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }
        
        public int TaskTime { get; set; }

        public DateTime TaskStart { get; set; }
        
        public DateTime TaskEnd { get; set; }
        
        public bool Status { get; set; }
        
    }
}