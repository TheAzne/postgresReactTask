using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using postgresReact.Data;
using postgresReactTask.Model;

namespace postgresReactTask.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {

        private readonly ApiDbContext _apiDbContext;

        public TasksController(ApiDbContext apiDbContext)
        {
            _apiDbContext = apiDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var task = await _apiDbContext.Tasks.ToListAsync();
            return Ok(task);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Tasks tasks)
        {

            tasks.CreatedAt = DateTime.UtcNow;
            tasks.UpdatedAt = DateTime.UtcNow;

            _apiDbContext.Tasks.Add(tasks);
            await _apiDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = tasks.Id }, tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _apiDbContext.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] Tasks updateTask)
        {
            var task = await _apiDbContext.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }
            task.Name = updateTask.Name;
            task.Description = updateTask.Description;
            task.TaskTime = updateTask.TaskTime;
            task.Status = updateTask.Status;
            task.UpdatedAt = DateTime.UtcNow;
            task.TaskStart = updateTask.TaskStart;
            task.TaskEnd = updateTask.TaskEnd;
            try
            {
                await _apiDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_apiDbContext.Tasks.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _apiDbContext.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            _apiDbContext.Tasks.Remove(task);
            await _apiDbContext.SaveChangesAsync();

            return NoContent();
        }

    }
}