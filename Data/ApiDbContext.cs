using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using postgresReactTask.Model;

namespace postgresReact.Data;
public class ApiDbContext : DbContext
{
    public virtual DbSet<Tasks> Tasks { get; set; }

    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {

    }

}