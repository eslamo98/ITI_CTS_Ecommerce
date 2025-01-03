using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;

class Program
{
    private const string ApiUrl = "https://dummyjson.com/users";

    static async Task Main(string[] args)
    {
        string imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "UsersImages");

        // Ensure the images folder exists
        Directory.CreateDirectory(imagesFolder);

        try
        {
            using HttpClient client = new HttpClient();
            Console.WriteLine("Fetching products data...");

            // Fetch product data from API
            string response = await client.GetStringAsync(ApiUrl);
            var productsData = JsonDocument.Parse(response);
            var products = productsData.RootElement.GetProperty("users");

            int downloadCount = 0;

            foreach (var product in products.EnumerateArray())
            {
                if (downloadCount >= 50) break; // Limit to 50 images

                string productName = product.GetProperty("username").GetString();
                string imageUrl = product.GetProperty("image").GetString(); // Get the first image

                string fileName = $"{MakeValidFileName(productName)}.jpg";
                string filePath = Path.Combine(imagesFolder, fileName);

                Console.WriteLine($"Downloading {productName}...");

                // Download and save the image
                byte[] imageData = await client.GetByteArrayAsync(imageUrl);
                await File.WriteAllBytesAsync(filePath, imageData);

                downloadCount++;
            }

            Console.WriteLine("Download complete!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }

    // Helper to create valid file names
    private static string MakeValidFileName(string name)
    {
        foreach (char invalidChar in Path.GetInvalidFileNameChars())
        {
            name = name.Replace(invalidChar.ToString(), "_");
        }
        return name;
    }
}
