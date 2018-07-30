using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SysQueiroz.Core.Migrations
{
    public partial class SysQueiroz005 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SuperName",
                table: "Menus",
                newName: "superHref");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "superHref",
                table: "Menus",
                newName: "SuperName");
        }
    }
}
