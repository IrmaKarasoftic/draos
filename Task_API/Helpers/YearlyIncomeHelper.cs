using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Task_API.Models;
using TaskDb;
using static TaskDb.Enumerators;

namespace Task_API.Helpers
{
    public class YearlyIncomeHelper
    {
        public static YearlyIncomeModel GetRevenueByYear(int year, AppContext context)
        {
            ModelFactory factory = new ModelFactory();
            YearlyIncomeModel model = new YearlyIncomeModel();
            Repository<InvoiceItem> invoiceRepository = new Repository<InvoiceItem>(context);
            ItemModel iModel = new ItemModel();
            double total = 0;
            var list = invoiceRepository.context.InvoiceItems.ToList();
            //Go through a list, and add the price of every sold item
            foreach (var item in list)
            {
                if (item.Invoice.Date.Year == year && item.Invoice.Status == Status.Paid)
                {

                    total += item.Price * item.Quantity;
                    iModel = factory.Create(item.Item);
                    iModel.Quantity = item.Quantity;
                    iModel.UnitPrice = item.Price;
                    model.Items.Add(iModel);
                }
            }
            model.Total = total;
            model.year = year;
            return model;
        }
    }
}