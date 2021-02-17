using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EricDeeTTSTS.Data;
using EricDeeTTSTS.Models;
using Microsoft.AspNetCore.Authorization;

namespace EricDeeTTSTS.Controllers
{
    public class StringCommandController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StringCommandController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: StringCommand
        public async Task<IActionResult> Index()
        {
            return View("~/Views/StringCommand/Index.cshtml", await _context.StringCommand.ToListAsync()); /// Selects all from the specified table.
        }

        /// GET: StringCommand/DisplaySearchForm
        ///
        ///
        public async Task<IActionResult> DisplaySearchForm()
        {
            return View("DisplaySearchForm"); /// View from pointer to DesiplaySearchForm method label.
        }

        /// GET: StringCommand/ShowSearchResults
        ///
        ///
        public async Task<IActionResult> DisplaySearchResults(string searchPhrase)
        {
            return View("Index", await _context.StringCommand.Where( s => s.Command.Contains(searchPhrase)).ToListAsync()); /// Returns a command from a pointer where the select contains the searchPhrase entered on the input form box.
        }

        // GET: StringCommand/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var stringCommand = await _context.StringCommand
                .FirstOrDefaultAsync(m => m.Id == id);
            if (stringCommand == null)
            {
                return NotFound();
            }

            return View(stringCommand);
        }

        // GET: StringCommand/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: StringCommand/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Command")] StringCommand stringCommand)
        {
            if (ModelState.IsValid)
            {
                _context.Add(stringCommand);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(stringCommand);
        }

        // GET: StringCommand/Edit/5
        [Authorize]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var stringCommand = await _context.StringCommand.FindAsync(id);
            if (stringCommand == null)
            {
                return NotFound();
            }
            return View(stringCommand);
        }

        // POST: StringCommand/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Command")] StringCommand stringCommand)
        {
            if (id != stringCommand.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(stringCommand);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StringCommandExists(stringCommand.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(stringCommand);
        }

        // GET: StringCommand/Delete/5
        [Authorize]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var stringCommand = await _context.StringCommand
                .FirstOrDefaultAsync(m => m.Id == id);
            if (stringCommand == null)
            {
                return NotFound();
            }

            return View(stringCommand);
        }

        // POST: StringCommand/Delete/5
        [Authorize]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var stringCommand = await _context.StringCommand.FindAsync(id);
            _context.StringCommand.Remove(stringCommand);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool StringCommandExists(int id)
        {
            return _context.StringCommand.Any(e => e.Id == id);
        }
    }
}
