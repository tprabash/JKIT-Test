using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace API.Models
{
    public class CandidateDbContext : DbContext
    {
        public CandidateDbContext(DbContextOptions<CandidateDbContext> options) : base(options)
        {
        }

        public DbSet<Candidate> Candidate { get; set; }

        public DbSet<Department> Department { get; set; }

        public DbSet<CandidateSave> CandidateSave { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=Candidate;User Id=sa;Password=1234;TrustServerCertificate=true;");
        }

        public async Task<List<Candidate>> GetAllCandidatesAsync()
        {
            return await Candidate.FromSqlRaw("EXEC GetAllCandidates").ToListAsync();
        }

        public async Task<List<Department>> GetAllDepartmentAsync()
        {
            return await Department.FromSqlRaw("EXEC GetAllDepartments").ToListAsync();
        }

        public async Task SaveCandidateAsync(CandidateSave candidateSave)
        {
            await Database.ExecuteSqlRawAsync("EXEC SaveCandidates @FirstName, @LastName, @Email, @DOB, @Age, @Salary, @DepartmentId",
                new SqlParameter("@FirstName", candidateSave.FirstName),
                new SqlParameter("@LastName", candidateSave.LastName),
                new SqlParameter("@Email", candidateSave.Email),
                new SqlParameter("@DOB", candidateSave.DOB),
                new SqlParameter("@Age", candidateSave.Age),
                new SqlParameter("@Salary", candidateSave.Salary),
                new SqlParameter("@DepartmentId", candidateSave.DepartmentId));
        }

        public async Task UpdateCandidateAsync(CandidateSave candidateSave)
        {
            await Database.ExecuteSqlRawAsync("EXEC UpdateCandidates @Id, @FirstName, @LastName, @Email, @DOB, @Age, @Salary, @DepartmentId",
                new SqlParameter("@Id", candidateSave.Id),
                new SqlParameter("@FirstName", candidateSave.FirstName),
                new SqlParameter("@LastName", candidateSave.LastName),
                new SqlParameter("@Email", candidateSave.Email),
                new SqlParameter("@DOB", candidateSave.DOB),
                new SqlParameter("@Age", candidateSave.Age),
                new SqlParameter("@Salary", candidateSave.Salary),
                new SqlParameter("@DepartmentId", candidateSave.DepartmentId));
        }

        public async Task DeleteCandidateByIdAsync(int id)
        {
            await Database.ExecuteSqlRawAsync("EXEC DeleteCandidates @Id",
                new SqlParameter("@Id", id));
        }
    }
}

