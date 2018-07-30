using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SysQueiroz.Core.Migrations
{
    public partial class SysQueiroz003 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SuperId",
                table: "Menus");

            migrationBuilder.AddColumn<string>(
                name: "SuperName",
                table: "Menus",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SuperName",
                table: "Menus");

            migrationBuilder.AddColumn<int>(
                name: "SuperId",
                table: "Menus",
                nullable: false,
                defaultValue: 0);
        }
    }
}
