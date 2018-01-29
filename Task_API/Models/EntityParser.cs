using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskDb;
using static TaskDb.Enumerators;

namespace Task_API.Models
{
    public class EntityParser
    {
        public Invoice Create(InvoiceModel model, AppContext context)
        {
            return new Invoice()
            {
                Id = model.Id,
                Date = model.Date,
                Customer = context.Customers.Find(model.Customer),
                Status = (Status)Enum.Parse(typeof(Status), model.Status),
                IsDeleted = model.IsDeleted,
            };
        }
        public Item Create(ItemModel model, AppContext context)
        {
            return new Item()
            {
                Id = model.Id,
                Description = model.Description,
                Quantity = model.Quantity,
                UnitPrice = model.UnitPrice,
                IsDeleted = model.IsDeleted,
            };
        }
        public InvoiceItem Create(InvoiceItemModel model, AppContext context)
        {
            return new InvoiceItem()
            {
                Id = model.Id,
                Invoice = context.Invoices.Find(model.InvoiceId),
                Item = context.Items.Find(model.ItemId),
                Quantity = model.Quantity,
                Price = model.Price
            };
        }
        public Company Create(CompanyModel model, AppContext context)
        {
            var companyEntity =  new Company
            {
                Id = model.Id,
                Name = model.Name,
                city = model.City,
                phoneNumber = model.PhoneNumber,
                StreetAddress = model.StreetAddress,
                zipCode = model.ZipCode,
                IsDeleted = model.IsDeleted,
            };
            companyEntity.CompanyUrl = string.IsNullOrEmpty(model.CompanyUrl) ? "http://waters-company.com/wp-content/themes/watersconsulting_wp_theme/images/city_scape5b.jpg" : model.CompanyUrl;
            return companyEntity;
        }

        public Customer Create(CustomerModel model, AppContext context)
        {
            var customer = new Customer()
            {
                Id = model.Id,
                Name = model.Name,
                Company = context.Companies.Find(model.Company),
                IsDeleted = model.IsDeleted,
            };
            customer.UserImageUrl = string.IsNullOrEmpty(model.CustomerImageUrl) ? "https://www.atomix.com.au/media/2015/06/atomix_user31.png" : model.CustomerImageUrl;
            return customer;
        }
    }
}