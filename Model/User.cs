using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace postgresReactTask.Model
{
    public class User : IdentityUser
    {
        [Key]
        public int Id { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        public string Email { get; set; }
        
        public string Password { get; set; }
        
        public string Profession { get; set; }
        
        public decimal HourOfWork { get; set; }

        public string Role { get; set; }
        
        
    }
}