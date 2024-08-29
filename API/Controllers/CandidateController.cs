using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly CandidateDbContext _candidateDbContext;

        public CandidateController(CandidateDbContext candidateDbContext)
        {
            _candidateDbContext = candidateDbContext;
        }

        [HttpGet]
        [Route("GetCandidate")]
        public async Task<IEnumerable<Candidate>> GetCandidate()
        {
            return await _candidateDbContext.GetAllCandidatesAsync();
        }

        [HttpGet]
        [Route("GetDepartent")]
        public async Task<IEnumerable<Department>> GetDepartent()
        {
            return await _candidateDbContext.GetAllDepartmentAsync();
        }

        [HttpPost]
        [Route("AddCandidate")]
        public async Task<IActionResult> AddCandidate([FromBody] CandidateSave candidateSave)
        {
            if (candidateSave == null)
            {
                return BadRequest("Candidate data is null");
            }

            await _candidateDbContext.SaveCandidateAsync(candidateSave);
            return Ok(candidateSave);
        }

        [HttpPatch]
        [Route("UpdateCandidate")]
        public async Task<IActionResult> UpdateCandidate([FromBody] CandidateSave candidateSave)
        {
            await _candidateDbContext.UpdateCandidateAsync(candidateSave);
            return Ok(candidateSave);
        }

        [HttpDelete]
        [Route("DeleteCandidate/{id}")]
        public async Task<IActionResult> DeleteCandidate(int id)
        {
            await _candidateDbContext.DeleteCandidateByIdAsync(id);
            return NoContent();
        }
    }
}
