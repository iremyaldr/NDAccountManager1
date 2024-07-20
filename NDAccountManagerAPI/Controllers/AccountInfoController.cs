// Controllers/AccountInfoController.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NDAccountManagerAPI.Data;
using NDAccountManagerAPI.Models;

namespace NDAccountManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
        
    public class AccountInfoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountInfoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountInfo>>> GetAccountInfos()
        {
            return await _context.AccountInfos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AccountInfo>> GetAccountInfo(int id)
        {
            var accountInfo = await _context.AccountInfos.FindAsync(id);

            if (accountInfo == null)
            {
                return NotFound();
            }

            return accountInfo;
        }

 [HttpPost]
public async Task<ActionResult<AccountInfo>> PostAccountInfo(AccountInfo accountInfo)
{
    accountInfo.CreatedAt = DateTime.UtcNow;
    try
    {
        _context.AccountInfos.Add(accountInfo);
        await _context.SaveChangesAsync();
    }
    catch (Exception ex)
    {
        // Hata mesajını günlüğe yazdırın veya konsolda gösterin
        Console.WriteLine(ex.Message);
        return BadRequest("There was an error processing your request.");
    }

    return CreatedAtAction("GetAccountInfo", new { id = accountInfo.Id }, accountInfo);
}
        [HttpPut("{id}")]
public async Task<IActionResult> PutAccountInfo(int id, AccountInfo accountInfo)
{
    // Ensure the DateTime properties are set to UTC
    accountInfo.CreatedAt = DateTime.UtcNow; 

    _context.Entry(accountInfo).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!AccountInfoExists(id))
        {
            return NotFound();
        }
        else
        {
            throw;
        }
    }

    return NoContent();
}


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountInfo(int id)
        {
            var accountInfo = await _context.AccountInfos.FindAsync(id);
            if (accountInfo == null)
            {
                return NotFound();
            }

            _context.AccountInfos.Remove(accountInfo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountInfoExists(int id)
        {
            return _context.AccountInfos.Any(e => e.Id == id);
        }
    }
}
