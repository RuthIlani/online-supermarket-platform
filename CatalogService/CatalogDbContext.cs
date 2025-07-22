using Microsoft.EntityFrameworkCore;
using CatalogService.Models;

namespace CatalogService
{
    public class CatalogDbContext : DbContext
    {
        public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "אלקטרוניקה", Description = "מוצרי אלקטרוניקה" },
                new Category { Id = 2, Name = "ביגוד", Description = "בגדים ואופנה" },
                new Category { Id = 3, Name = "ספרים", Description = "ספרים ומגזינים" }
            );

            // Seed Products
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "טלפון חכם", Description = "סמארטפון מתקדם", Price = 2999, CategoryId = 1 },
                new Product { Id = 2, Name = "מחשב נייד", Description = "לפטופ איכותי", Price = 4999, CategoryId = 1 },
                new Product { Id = 3, Name = "אוזניות", Description = "אוזניות אלחוטיות", Price = 399, CategoryId = 1 },
                new Product { Id = 4, Name = "חולצה", Description = "חולצה אופנתית", Price = 99, CategoryId = 2 },
                new Product { Id = 5, Name = "מכנסיים", Description = "מכנסיים נוחות", Price = 149, CategoryId = 2 },
                new Product { Id = 6, Name = "מעיל", Description = "מעיל חורף", Price = 299, CategoryId = 2 },
                new Product { Id = 8, Name = "מדע בדיוני", Description = "ספר מדע בדיוני", Price = 69, CategoryId = 3 },
                new Product { Id = 9, Name = "מגזין", Description = "מגזין חודשי", Price = 29, CategoryId = 3 }
            );
        }
    }
}
