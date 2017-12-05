namespace TaskDb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedImageUrlsToCompanyAndUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Companies", "CompanyUrl", c => c.String());
            AddColumn("dbo.Customers", "UserImageUrl", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "UserImageUrl");
            DropColumn("dbo.Companies", "CompanyUrl");
        }
    }
}
