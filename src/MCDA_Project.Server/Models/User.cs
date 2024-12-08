namespace MCDA_Project.Server.Models
{
    public class User
    {
        public int UserID { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }

        public string? FirstName { get; set; } // Nullable and not required
        public string? LastName { get; set; }  // Nullable and not required

        public string? City { get; set; }
        public string? ProvinceState { get; set; }
        public string? Country { get; set; }
        public string? PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
        public string? EmailAddress { get; set; }
        public string? CreditCardNumber { get; set; }
        public string? CreditCardType { get; set; } // Enum-like string: Mastercard, Visa, Amex

        // Changed to yy/MM format
        public DateTime? ExpiryDate { get; set; }


        // Navigation Property
        public ICollection<Recipe>? Recipes { get; set; }
    }
}
