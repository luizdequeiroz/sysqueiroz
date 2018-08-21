using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SysQueiroz.Core.Migrations
{
    public partial class SysQueiroz002 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MenuMethods",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MenuId = table.Column<int>(nullable: false),
                    MethodId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuMethods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MenuMethods_Menus_MenuId",
                        column: x => x.MenuId,
                        principalTable: "Menus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MenuMethods_Methods_MethodId",
                        column: x => x.MethodId,
                        principalTable: "Methods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MenuMethods_MenuId",
                table: "MenuMethods",
                column: "MenuId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuMethods_MethodId",
                table: "MenuMethods",
                column: "MethodId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MenuMethods");
        }
    }
}
