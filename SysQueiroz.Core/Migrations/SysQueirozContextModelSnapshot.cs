﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using SysQueiroz.Core;
using System;

namespace SysQueiroz.Core.Migrations
{
    [DbContext(typeof(SysQueirozContext))]
    partial class SysQueirozContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SysQueiroz.Core.Entities.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Account");

                    b.Property<string>("Agency");

                    b.Property<string>("Bank");

                    b.Property<string>("BenefitNumber");

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("CPF");

                    b.Property<string>("CounterCheckPassword");

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("Op");

                    b.Property<string>("Phone");

                    b.Property<string>("PortalPassword");

                    b.Property<string>("PortalRegistration");

                    b.Property<string>("RG");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DepartmentId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Menu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Href");

                    b.Property<string>("Icon");

                    b.Property<bool>("IsSuper");

                    b.Property<string>("Name");

                    b.Property<string>("superHref");

                    b.HasKey("Id");

                    b.ToTable("Menus");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.MenuAccess", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MenuId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("MenuId");

                    b.HasIndex("UserId");

                    b.ToTable("MenuAccesses");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Method", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Methods");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<int>("EmployeeId");

                    b.Property<string>("Password");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("RoleId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Employee", b =>
                {
                    b.HasOne("SysQueiroz.Core.Entities.Department", "Department")
                        .WithMany("Employees")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.MenuAccess", b =>
                {
                    b.HasOne("SysQueiroz.Core.Entities.Menu", "Menu")
                        .WithMany("MenuAccesses")
                        .HasForeignKey("MenuId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SysQueiroz.Core.Entities.User", "User")
                        .WithMany("MenuAccesses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Method", b =>
                {
                    b.HasOne("SysQueiroz.Core.Entities.Role", "Role")
                        .WithMany("Methods")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.User", b =>
                {
                    b.HasOne("SysQueiroz.Core.Entities.Employee", "Employee")
                        .WithOne("User")
                        .HasForeignKey("SysQueiroz.Core.Entities.User", "EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.UserRole", b =>
                {
                    b.HasOne("SysQueiroz.Core.Entities.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SysQueiroz.Core.Entities.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
